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

describe('App', () => {
  test('inputs should be initial empty', () => {
    render(<App />);
    expect(screen.getByRole('textbox').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('');
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

  describe('error handling', () => {
    beforeEach(() => {}); // эта функция запустится перед всеми тестатми в этом describe блоке

    test('should show email error message on  invalid email', () => {
      render(<App />);

      expect(
        screen.queryByText(/the email you input is invalid/)
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: 'selenagmail.com',
      });
      typeSubmitButton();

      expect(
        screen.getByText(/the email you input is invalid/)
      ).toBeInTheDocument();
    });

    test('password should contains at leat 5 characters', () => {
      render(<App />);

      expect(
        screen.queryByText(
          /The password you entered should contain 5 or more character/
        )
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: 'selena@gmail.com',
        password: '8976',
      });
      typeSubmitButton();

      expect(
        screen.getByText(
          /The password you entered should contain 5 or more character./
        )
      ).toBeInTheDocument();
    });

    test('passwords should be the same', () => {
      render(<App />);

      expect(
        screen.queryByText(/The passwords don't match. Try again/)
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: 'selena@gmail.com',
        password: '897687',
        confirmPassword: 'sdasdasdaasd',
      });
      typeSubmitButton();

      expect(
        screen.getByText(/The passwords don't match. Try again/)
      ).toBeInTheDocument();
    });

    test(`if no error we shouldn't show error messages`, () => {
      render(<App />);

      expect(
        screen.queryByText(
          /The password you entered should contain 5 or more character/
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the email you input is invalid/)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/The passwords don't match. Try again/)
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: 'selena@gmail.com',
        password: '897687',
        confirmPassword: '897687',
      });
      typeSubmitButton();

      expect(
        screen.queryByText(
          /The password you entered should contain 5 or more character/
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the email you input is invalid/)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/The passwords don't match. Try again/)
      ).not.toBeInTheDocument();
    });
  });
});
