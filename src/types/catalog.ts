export interface CatalogState {
  cardsList: Card[];
  statusGetAllActsTypes: string;
  errorGetAllActsTypes: string | null;
}

export interface Card {
  id: number;
}

export interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string[];
  price: string;
  color: string;
}

export interface ImageModalProps {
  product: Product;
  onClose: () => void;
}
