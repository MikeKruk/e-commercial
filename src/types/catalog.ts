export interface CatalogState {
  cardsList: Card[];
  searchCardsList: Card[];
  statusGetAllActsTypes: string;
  errorGetAllActsTypes: string | null;
  priceRange: {
    min: number;
    max: number;
  };
  selectedDiscount: boolean;
  selectedCategory: { name: string; id: string };
  sortedValue: string;
  categoriesList: Category[];
  searchValue: string;
}

export interface Category {
  id: string;
  key: string;
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
}

export interface DataGetCatalogApi {
  id: string;
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
  categories: [{ id: string }];
}

export interface DataGetCategoryApi {
  id: string;
  description: {
    'en-US': string;
  };
  name: {
    'en-US': string;
  };
  key: string;
}

export interface ImageUrl {
  url: string;
}

interface Price {
  value: {
    centAmount: number;
  };
  discounted: {
    value: {
      centAmount: number;
    };
  };
}

export interface FilterParams {
  minPrice: number;
  maxPrice: number;
  selectedDiscount: boolean;
  selectedCategory: { name: string; id: string };
  sortedValue: string;
  searchValue?: string;
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
  discount: number;
  category: string;
}

export interface ImageModalProps {
  dataImage: DataImage;
  onClose: () => void;
}

export interface IUFilterSelect {
  title: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface IProductCardProps {
  description: string;
  id: string;
  images: { url: string }[];
  name: string;
  price: number;
  discount: number;
  onClick: (data: DataImage) => void;
  key: string;
}
