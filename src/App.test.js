import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('inputs should be initial empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordElement.value).toBe('');
});

test('should be able to type an email', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, // we can filter all elements with role textbox by name
  });
  userEvent.type(emailInputElement, 'selena@gmail.com');
  expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type a password', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, '12345');
  expect(passwordInputElement.value).toBe('12345');
});

test('should be able to type a conform password', () => {
  render(<App />);
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordElement, '12345');
  expect(confirmPasswordElement.value).toBe('12345');
});

test('should show email error message on  invalid email', () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/
  );
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole('button');

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'selenagmail.com');
  userEvent.click(submitBtnElement);

  expect(emailErrorElement).toBeInTheDocument();
});
