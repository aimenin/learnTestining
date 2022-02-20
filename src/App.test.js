import { render, screen } from '@testing-library/react';
import App from './App';

test('inputs should be initial empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  expect(emailInputElement.value).toBe('');
});
