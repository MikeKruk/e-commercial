// import { MethodType } from '@commercetools/platform-sdk';
// import { productsCtpClient } from '../BuildClient';

// const { PROJECT_KEY } = process.env;
// async function getProducts() {
//   try {
//     const request = {
//       uri: `/${PROJECT_KEY}/products`,
//       method: 'GET' as MethodType,
//     };

//     const response = await productsCtpClient.execute(request);
//     return response;
//   } catch (e) {
//     console.log(e);
//   }
//   return null;
// }

// const products = {
//   getProducts,
// };

// export default products;

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

export const addActsTypeApi = 'addActsTypeApi';
