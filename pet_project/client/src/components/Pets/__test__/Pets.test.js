import { render, screen, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

import Pets from '../Pets';
import catsMock from '../../../mocks/cats.json';

const server = setupServer(
  rest.get('http://localhost:4000/cats', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  })
); // setup fake server

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pets', () => {
  test('should render the correct amount of car', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    expect(cards.length).toBe(5);
  });

  test('should filter for male cats', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male');
    const maleCards = screen.getAllByRole('article');
    expect(maleCards).toStrictEqual([cards[1], cards[3]]); // we use toStrictEqual because we make assertion with array
  });

  test('should filter for female cats', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'female');
    const maleCards = screen.getAllByRole('article');
    expect(maleCards).toStrictEqual([cards[0], cards[2], cards[4]]); // we use toStrictEqual because we make assertion with array
  });

  test('should filter for favoured cars', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const btnForFirstCard = within(cards[0]).getByRole('button'); // we use within to find an element within other element
    const btnForFourthCard = within(cards[3]).getByRole('button'); // we use within to find an element within other element
    userEvent.click(btnForFirstCard);
    userEvent.click(btnForFourthCard);

    userEvent.selectOptions(screen.getByLabelText(/favoured/i), 'favoured');
    const favouredCards = screen.getAllByRole('article');
    expect(favouredCards).toStrictEqual([cards[0], cards[3]]); // we use toStrictEqual because we make assertion with array
  });

  test('should filter for not favoured cars', async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole('article');
    const btnForFirstCard = within(cards[0]).getByRole('button'); // we use within to find an element within other element
    const btnForFourthCard = within(cards[3]).getByRole('button'); // we use within to find an element within other element
    userEvent.click(btnForFirstCard);
    userEvent.click(btnForFourthCard);

    userEvent.selectOptions(screen.getByLabelText(/favoured/i), 'not favoured');
    const notFavouredCards = screen.getAllByRole('article');
    expect(notFavouredCards).toStrictEqual([cards[1], cards[2], cards[4]]); // we use toStrictEqual because we make assertion with array
  });
});
