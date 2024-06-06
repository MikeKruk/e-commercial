export interface CatalogState {
  cardsList: Card[];
  statusGetAllActsTypes: string;
  errorGetAllActsTypes: string | null;
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
      };
    };
  };
}

export interface ImageUrl {
  url: string;
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
}

export interface ImageModalProps {
  dataImage: DataImage;
  onClose: () => void;
}
