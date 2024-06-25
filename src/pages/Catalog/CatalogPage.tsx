import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import ImageModal from '../../components/ImageModal/ImageModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useBodyClass } from '../../store/catalog/hooks';
import FilterProducts from '../../components/FilterProducts/FilterProducts';
import SortProducts from '../../components/SortProducts/SortProducts';
import Search from '../../components/Search/Search';

import {
  getCatalogApi,
  getCategoriesApi,
  getSearchProductsApi,
} from '../../API/requests/catalog';
import { DataImage } from '../../types/catalog';
import { MAX_PRICE } from '../../constants/constants';
import getSortedCardsList from '../../utils/getSortedCardsList';

import {
  setPrice,
  setSelectedCategory,
  setSelectedDiscount,
} from '../../store/catalog/catalogSlice';
import ProductCard from '../../components/ProductCard/ProductCard';

const CatalogPage = () => {
  const [dataImage, setDataImage] = useState<DataImage | null>(null);
  const dispatch = useAppDispatch();
  const {
    cardsList,
    priceRange,
    selectedDiscount,
    selectedCategory,
    sortedValue,
    searchCardsList,
    searchValue,
  } = useAppSelector(state => state.catalog);

  console.log('searchValue', searchValue);
  useEffect(() => {
    dispatch(
      searchValue
        ? getSearchProductsApi({
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            selectedDiscount,
            selectedCategory,
            sortedValue,
            searchValue,
          })
        : getCatalogApi({
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            selectedDiscount,
            selectedCategory,
            sortedValue,
          }),
    );
  }, [
    priceRange,
    selectedDiscount,
    selectedCategory,
    sortedValue,
    searchValue,
    dispatch,
  ]);

  console.log('searchCardsList', searchCardsList);
  const cards = getSortedCardsList(
    searchValue ? searchCardsList : cardsList,
    sortedValue,
  );

  useEffect(() => {
    dispatch(getCategoriesApi());
  }, [dispatch]);

  const openImageSlider = (data: DataImage) => {
    setDataImage(data);
  };

  const closeImageSlider = () => {
    setDataImage(null);
  };

  const resetPriceFilter = () => dispatch(setPrice({ min: 0, max: MAX_PRICE }));
  const resetCategoryFilter = () => dispatch(setSelectedCategory({ name: '', id: '' }));
  const resetDiscountFilter = () => dispatch(setSelectedDiscount(false));

  useBodyClass('lock', !!dataImage);

  const hasPriceFilter = priceRange.min > 0 || priceRange.max < MAX_PRICE;
  const hasCategoryFilter = !!selectedCategory.name;
  const hasDiscountFilter = selectedDiscount;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pb-24 sm:pt-8 lg:max-w-7xl lg:px-8 position: relative">
        <Search />
        <div className="flex gap-5 items-center mb-5">
          <SortProducts />
          <FilterProducts />
          {(hasPriceFilter || hasCategoryFilter || hasDiscountFilter) && (
            <div className="flex flex-wrap gap-5">
              {hasPriceFilter && (
                <div className="rounded-full bg-gray-700 px-4 py-1 flex justify-between gap-5 items-center">
                  <span className="text-sm font-medium text-white">
                    Price: {priceRange.min}$ - {priceRange.max}$
                  </span>
                  <button
                    type="button"
                    className="hover:bg-indigo-500 rounded-full p-.5"
                    onClick={resetPriceFilter}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              {hasCategoryFilter && (
                <div className="rounded-full bg-gray-700 px-4 py-1 flex justify-between gap-5 items-center">
                  <span className="text-sm font-medium text-white">
                    Category: {selectedCategory.name}
                  </span>
                  <button
                    type="button"
                    className="hover:bg-indigo-500 rounded-full p-.5"
                    onClick={resetCategoryFilter}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              {hasDiscountFilter && (
                <div className="rounded-full bg-gray-700 px-4 py-1 flex justify-between gap-5 items-center">
                  <span className="text-sm font-medium text-white">Only discount</span>
                  <button
                    type="button"
                    className="hover:bg-indigo-500 rounded-full p-.5"
                    onClick={resetDiscountFilter}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {searchValue ? (
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            <div className="filter-results">
              <h3>Search results:</h3>
              <h2>
                {searchValue} - {searchCardsList.length} products
              </h2>
              <span className="text-sm font-medium text-gray-600">
                {cards.length} products found
              </span>
            </div>
          </h2>
        ) : (
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {!(hasPriceFilter || hasCategoryFilter || hasDiscountFilter) ? (
              <span>Customers also purchased</span>
            ) : (
              <div className="filter-results">
                <h3>Results:</h3>
                <span className="text-sm font-medium text-gray-600">
                  {cards.length} products found
                </span>
              </div>
            )}
          </h2>
        )}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cards.map(product => (
            <ProductCard
              key={product.id}
              description={product.description}
              id={product.id}
              images={product.images}
              name={product.name}
              price={product.price}
              discount={product.discount}
              onClick={openImageSlider}
            />
          ))}
        </div>
        {dataImage && <ImageModal dataImage={dataImage} onClose={closeImageSlider} />}
      </div>
    </div>
  );
};

export default CatalogPage;
