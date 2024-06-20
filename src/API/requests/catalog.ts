/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';

import { Card, DataGetCatalogApi, FilterParams } from '../../types/catalog';
import { MAX_LIMIT, MAX_PRICE, SORT_TITLES } from '../../constants/constants';

const { API_URL, PROJECT_KEY } = process.env;

const getClearObject = (data: DataGetCatalogApi[]) => {
  console.log('getClearObjectdata', data);
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

export const getCatalogApi = createAsyncThunk<Card[], FilterParams>(
  'catalog/getCatalogApi',

  async (filterParams: FilterParams) => {
    const { minPrice, maxPrice, sortedValue, selectedCategory } = filterParams;
    let queryParams = '';
    if (minPrice > 0 && maxPrice !== MAX_PRICE) {
      queryParams += `&filter=variants.price.centAmount:range+(${minPrice * 100}+to+${maxPrice * 100})`;
    } else if (minPrice > 0) {
      queryParams += `&filter=variants.price.centAmount:range+(${minPrice * 100}+to+*)`;
    } else if (maxPrice !== MAX_PRICE) {
      queryParams += `&filter=variants.price.centAmount:range+(*+to+${maxPrice * 100})`;
    }

    if (selectedCategory) {
      queryParams += `&filter=categories.id:${selectedCategory}`;
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

// Удалить с появлением нового запроса
export const addActsTypeApi = 'addActsTypeApi';
