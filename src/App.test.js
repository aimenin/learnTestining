import { render, screen } from '@testing-library/react';
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
