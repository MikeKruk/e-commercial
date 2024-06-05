export interface CatalogState {
  cardsList: Card[];
  statusGetAllActsTypes: string;
  errorGetAllActsTypes: string | null;
}

export interface Card {
  id: number;
}
