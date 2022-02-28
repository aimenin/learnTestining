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

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/
  );

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test('password should contains at leat 5 characters', () => {
  render(<App />);

  const passwordErrorElement = screen.queryByText(
    /The password you entered should contain 5 or more character/
  );

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText('Password');
  const submitBtnElement = screen.getByRole('button');

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, '8976');
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /The password you entered should contain 5 or more character./
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test('passwords should be the same', () => {
  render(<App />);

  const passwordErrorElement = screen.queryByText(
    /The passwords don't match. Try again/
  );

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole('button');

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, '897687');
  userEvent.type(confirmPasswordElement, 'sdasdasdaasd');
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /The passwords don't match. Try again/
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test(`if no error we shouldn't show error messages`, () => {
  render(<App />);

  const passwordErrorElement = screen.queryByText(
    /The password you entered should contain 5 or more character/
  );
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/
  );
  const confirmPasswordErrorElement = screen.queryByText(
    /The passwords don't match. Try again/
  );

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole('button');

  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, '897687');
  userEvent.type(confirmPasswordElement, '897687');
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /The password you entered should contain 5 or more character/
  );
  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/
  );
  const conformPasswordErrorElementAgain = screen.queryByText(
    /The passwords don't match. Try again/
  );

  expect(passwordErrorElementAgain).not.toBeInTheDocument();
  expect(emailErrorElementAgain).not.toBeInTheDocument();
  expect(conformPasswordErrorElementAgain).not.toBeInTheDocument();
});
