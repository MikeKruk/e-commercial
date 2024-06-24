import { Card } from '../types/catalog';

const getUniqueCategories = (products: Card[]) => {
  console.log(products);
  const uniqueCategories = products.reduce((acc: string[], product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);
  return uniqueCategories;
};

export default getUniqueCategories;
