import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  // render(<App />);
}); // Эта функция запустится перед каждым тестом в этом файле

afterEach(() => {}); // Эта функция запустится после каждого теста в этом файле

beforeAll(() => {}); // Эта функция запустится один раз перед выполнением всех тестов

afterAll(() => {}); // запустится один раз после всех тестов

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, // we can filter all elements with role textbox by name
  });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordElement,
  };
};

const typeSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button');
  userEvent.click(submitBtnElement);
};

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
  const { emailInputElement } = typeIntoForm({
    email: 'selena@gmail.com',
  });
  expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type a password', () => {
  render(<App />);
  const { passwordInputElement } = typeIntoForm({
    password: '12345',
  });
  expect(passwordInputElement.value).toBe('12345');
});

test('should be able to type a conform password', () => {
  render(<App />);
  const { confirmPasswordElement } = typeIntoForm({
    confirmPassword: '12345',
  });
  expect(confirmPasswordElement.value).toBe('12345');
});

test('should show email error message on  invalid email', () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/
  );

  expect(emailErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    email: 'selenagmail.com',
  });
  typeSubmitButton();

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

  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    email: 'selena@gmail.com',
    password: '8976',
  });
  typeSubmitButton();

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

  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    email: 'selena@gmail.com',
    password: '897687',
    confirmPassword: 'sdasdasdaasd',
  });
  typeSubmitButton();

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

  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    email: 'selena@gmail.com',
    password: '897687',
    confirmPassword: '897687',
  });
  typeSubmitButton();

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
