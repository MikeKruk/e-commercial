import { Card } from '../types/catalog';
import { SORT_TITLES } from '../constants/constants';

const getSortedCardsList = (cards: Card[], sortTilte: string) => {
  if (!cards) return [];
  switch (sortTilte) {
    case SORT_TITLES.BY_PRICE_ASC:
      return [...cards].sort((a, b) => a.price - b.price);
    case SORT_TITLES.BY_PRICE_DESC:
      return [...cards].sort((a, b) => b.price - a.price);
    default:
      return cards;
  }
};

export default getSortedCardsList;
