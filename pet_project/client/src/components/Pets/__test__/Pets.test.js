import { render, screen } from '@testing-library/react';

import Pets from '../Pets';

describe('Pets', () => {
  test('should render the correct amount of car', async () => {
    render(<Pets />);

    const cards = await screen.findAllByRole('article');

    expect(cards.length).toBe(5);
  });
});
