import fetch from 'node-fetch';
import { MethodType } from '@commercetools/platform-sdk';
import { LSTokens } from '../../../constants/constants';

const { PROJECT_KEY, API_URL } = process.env;

async function getProducts() {
  try {
    const accessToken = localStorage.getItem(LSTokens.ACCESS_TOKEN);
    const url = `${API_URL}/${PROJECT_KEY}/products`;

    const response = await fetch(url, {
      method: 'GET' as MethodType,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'error');
  }
}

const products = {
  getProducts,
};

export default products;
