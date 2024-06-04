import { MethodType } from '@commercetools/platform-sdk';
import { productsCtpClient } from '../BuildClient';

const { PROJECT_KEY } = process.env;
async function getProducts() {
  try {
    const request = {
      uri: `/${PROJECT_KEY}/products`,
      method: 'GET' as MethodType,
    };

    const response = await productsCtpClient.execute(request);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

const products = {
  getProducts,
};

export default products;
