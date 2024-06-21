/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';

import {
  Card,
  Category,
  DataGetCatalogApi,
  DataGetCategoryApi,
  FilterParams,
} from '../../types/catalog';
import {
  MAX_LIMIT,
  SORT_TITLES,
  MAX_PRICE,
  DISCOUNT_VALUE,
} from '../../constants/constants';

const { API_URL, PROJECT_KEY } = process.env;

const getClearObject = (data: DataGetCatalogApi[]) => {
  return data.map(item => {
    return {
      id: item.id,
      description: item.description['en-US'],
      name: item.name['en-US'],
      images: item.masterVariant.images,
      price: item.masterVariant.prices[0].value.centAmount / 100,
      discount: item.masterVariant.prices[0].discounted.value.centAmount / 100,
      category: item.categories[0].id,
    };
  });
};

const getClearCategory = (data: DataGetCategoryApi[]) => {
  return data.map(category => {
    return {
      id: category.id,
      description: { 'en-US': category.description['en-US'] },
      name: { 'en-US': category.name['en-US'] },
      key: category.key,
    };
  });
};

export const getCatalogApi = createAsyncThunk<Card[], FilterParams>(
  'catalog/getCatalogApi',

  async (filterParams: FilterParams) => {
    const { maxPrice, minPrice, sortedValue, selectedCategory, selectedDiscount } =
      filterParams;
    let queryParams = '';
    if (minPrice > 0 && maxPrice !== MAX_PRICE) {
      queryParams += `&filter=variants.price.centAmount:range+(${minPrice * 100}+to+${maxPrice * 100})`;
    } else if (minPrice > 0) {
      queryParams += `&filter=variants.price.centAmount:range+(${minPrice * 100}+to+*)`;
    } else if (maxPrice !== MAX_PRICE) {
      queryParams += `&filter=variants.price.centAmount:range+(*+to+${maxPrice * 100})`;
    }

    if (selectedDiscount) {
      queryParams += `&filter=variants.price.centAmount:range+(${DISCOUNT_VALUE * 100}+to+${MAX_PRICE * 100})`;
    }

    if (selectedCategory.id) {
      queryParams += `&filter=categories.id:+subtree(%22${selectedCategory.id}%22)`;
    }

    if (sortedValue && sortedValue === SORT_TITLES.BY_PRICE_ASC) {
      queryParams += `&sort=price+asc`;
    }
    if (sortedValue && sortedValue === SORT_TITLES.BY_PRICE_DESC) {
      queryParams += `&sort=price+desc`;
    }
    if (sortedValue && sortedValue === SORT_TITLES.BY_NAME) {
      queryParams += `&sort=name.en-US+asc`;
    }

    let url = `${API_URL}/${PROJECT_KEY}/product-projections/search?limit=${MAX_LIMIT}&markMatchingVariants=true&fuzzy=true&text.en=`;
    if (queryParams) {
      url += `${queryParams}`;
    }

    const response = await api.get(url);
    const data = getClearObject(response.data.results);

    return data;
  },
);

export const getCategoriesApi = createAsyncThunk<Category[]>(
  'catalog/getCategoriesApi',
  async () => {
    const url = `${API_URL}/${PROJECT_KEY}/categories`;
    const response = await api.get(url);
    const data = getClearCategory(response.data.results);
    return data;
  },
);

// Удалить с появлением нового запроса
export const addActsTypeApi = 'addActsTypeApi';
