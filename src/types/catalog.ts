export interface CatalogState {
  cardsList: Card[];
  statusGetAllActsTypes: string;
  errorGetAllActsTypes: string | null;
  minPrice: number;
  maxPrice: number;
}

export interface DataGetCatalogApi {
  id: string;
  masterData: {
    current: {
      description: {
        'en-US': string;
      };
      name: {
        'en-US': string;
      };
      masterVariant: {
        images: ImageUrl[];
        prices: Price[];
      };
    };
  };
}

export interface ImageUrl {
  url: string;
}

export interface Price {
  value: {
    centAmount: number;
  };
}

export interface FilterParams {
  minPrice: number;
  maxPrice: number;
}

export interface DataImage {
  id: string;
  images: ImageUrl[];
}

export interface Card {
  id: string;
  description: string;
  name: string;
  images: ImageUrl[];
  price: number;
}

export interface ImageModalProps {
  dataImage: DataImage;
  onClose: () => void;
}
