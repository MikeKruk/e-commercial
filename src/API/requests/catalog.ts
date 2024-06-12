/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';

import { Card, DataGetCatalogApi, FilterParams } from '../../types/catalog';
import { MAX_PRICE } from '../../constants/constants';

const { API_URL, PROJECT_KEY } = process.env;

const getClearObject = (data: DataGetCatalogApi[]) => {
  return data.map(item => {
    return {
      id: item.id,
      description: item.masterData.current.description['en-US'],
      name: item.masterData.current.name['en-US'],
      images: item.masterData.current.masterVariant.images,
      price: item.masterData.current.masterVariant.prices[0].value.centAmount / 100,
    };
  });
};

export const getCatalogApi = createAsyncThunk<Card[], FilterParams>(
  'catalog/getCatalogApi',

  async (filterParams: FilterParams) => {
    const { minPrice, maxPrice } = filterParams;
    let queryParams = '';
    if (minPrice > 0 && maxPrice !== MAX_PRICE) {
      queryParams = `filter=variants.price.centAmount:range+(${minPrice * 100}+to+${maxPrice * 100})`;
    } else if (minPrice > 0) {
      queryParams = `filter=variants.price.centAmount:range+(${minPrice * 100}+to+*)`;
    } else if (maxPrice !== MAX_PRICE) {
      queryParams = `filter=variants.price.centAmount:range+(*+to+${maxPrice * 100})`;
    }
    let url = `${API_URL}/${PROJECT_KEY}`;
    if (queryParams) {
      url += `/product-projections/search?${queryParams}`;
    } else {
      url += `/products`;
    }

    const response = await api.get(url);
    const data = getClearObject(response.data.results);

    return data;
  },
);

// Удалить с появлением нового запроса
export const addActsTypeApi = 'addActsTypeApi';
