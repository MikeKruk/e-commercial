/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';

import { Card, DataGetCatalogApi } from '../../types/catalog';

const { API_URL, PROJECT_KEY } = process.env;

const getClearObject = (data: DataGetCatalogApi[]) => {
  return data.map(item => {
    return {
      id: item.id,
      description: item.masterData.current.description['en-US'],
      name: item.masterData.current.name['en-US'],
      images: item.masterData.current.masterVariant.images,
    };
  });
};

export const getCatalogApi = createAsyncThunk<Card[]>(
  'catalog/getCatalogApi',
  async () => {
    const response = await api.get(`${API_URL}/${PROJECT_KEY}/products`);

    const data = getClearObject(response.data.results);

    return data;
  },
);

// Удалить с появлением нового запроса
export const addActsTypeApi = 'addActsTypeApi';
