import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';

import { Card } from '../../types/catalog';

const { API_URL, PROJECT_KEY } = process.env;

export const getCatalogApi = createAsyncThunk<Card[]>(
  'catalog/getCatalogApi',
  async () => {
    const response = await api.get(`${API_URL}/${PROJECT_KEY}/products`);

    return response.data;
  },
);

// Удалить с появлением нового запроса
export const addActsTypeApi = 'addActsTypeApi';
