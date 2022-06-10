import { render, screen } from '@testing-library/react';

import userEvents from '@testing-library/user-event';
import { PetsContext } from '../../Pets/Pets';
import Card from '../Card';
import cats from '../../../mocks/cats.json';

const cardProps = {
  name: 'Sydney',
  phone: '111-111-1111',
  email: 'test@nuimail.com',
  image: {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80',
    alt: 'cute cat',
  },
  favoured: false,
  updateFavored: () => {},
  index: 1,
};

const renderCardWithProvider = (props) => {
  render(
    <PetsContext.Provider value={{ cats, setCats: () => {} }}>
      <Card {...props} />
    </PetsContext.Provider>
  );
};

describe('Card', () => {
  test('should show name of cat', () => {
    renderCardWithProvider(cardProps);
    expect(
      screen.getByRole('heading', {
        name: /sydney/i,
      })
    ).toBeInTheDocument();
  });

  test('should show the phone number', () => {
    renderCardWithProvider(cardProps);
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test('should show the email', () => {
    renderCardWithProvider(cardProps);
    expect(screen.getByText(/test@nuimail.com/i)).toBeInTheDocument();
  });

  test('should show image with correct src', () => {
    renderCardWithProvider(cardProps);

    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test('should show outlined heart', () => {
    renderCardWithProvider(cardProps);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test('should show filled heart', () => {
    renderCardWithProvider({ ...cardProps, favoured: true });

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test('should toggle heart styles', () => {
    renderCardWithProvider(cardProps);

    const button = screen.getByRole('button');

    userEvents.click(button);

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvents.click(button);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
