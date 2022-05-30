import { render, screen } from '@testing-library/react';
import Card from '../Card';

const cardProps = {
  name: 'Sydney',
  phone: '111-111-1111',
  email: 'test@nuimail.com',
  image: {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80',
    alt: 'cute cat',
  },
  favoured: false,
};

describe('Card', () => {
  test('should show name of cat', () => {
    render(<Card {...cardProps} />);
    expect(
      screen.getByRole('heading', {
        name: /sydney/i,
      })
    ).toBeInTheDocument();
  });

  test('should show the phone number', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test('should show the email', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/test@nuimail.com/i)).toBeInTheDocument();
  });

  test('should show image with correct src', () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });
});