import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import ImageModal from '../../components/ImageModal/ImageModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useBodyClass } from '../../store/catalog/hooks';
import FilterProducts from '../../components/FilterProducts/FilterProducts';

import { getCatalogApi } from '../../API/requests/catalog';
import { DataImage } from '../../types/catalog';
import { MAX_PRICE } from '../../constants/constants';
import { setPrice, setSelectedCategory } from '../../store/catalog/catalogSlice';
import ProductCard from '../../components/ProductCard/ProductCard';

const CatalogPage = () => {
  const [dataImage, setDataImage] = useState<DataImage | null>(null);
  const dispatch = useAppDispatch();
  const {
    cardsList,
    priceRange,
    selectedDiscount,
    statusGetAllActsTypes,
    selectedCategory,
  } = useAppSelector(state => state.catalog);
  console.log(cardsList);

  const filteredCardList = cardsList.filter(item => {
    return (
      item.price >= priceRange.min &&
      item.price <= priceRange.max &&
      (!selectedCategory ||
        item.description.slice(0, item.description.indexOf(' ')) === selectedCategory)
    );
  });

  useEffect(() => {
    dispatch(
      getCatalogApi({
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        selectedDiscount,
        selectedCategory,
      }),
    );
  }, [priceRange, selectedDiscount, selectedCategory, dispatch]);

  const openImageSlider = (data: DataImage) => {
    setDataImage(data);
  };

  const closeImageSlider = () => {
    setDataImage(null);
  };

  const resetFilter = () => {
    dispatch(setPrice({ min: 0, max: MAX_PRICE }));
    dispatch(setSelectedCategory(''));
  };

  useBodyClass('lock', !!dataImage);

  if (statusGetAllActsTypes === 'loading') {
    console.log('loading');
    // потом можно будет добавить спинер
  }

  const hasPriceFilter = priceRange.min > 0 || priceRange.max < MAX_PRICE;
  const hasCategoryFilter = !!selectedCategory;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 position: relative">
        <div className="flex gap-5 items-center mb-5">
          <FilterProducts />
          {(hasPriceFilter || hasCategoryFilter) && (
            <div className="flex flex-wrap gap-5">
              {hasPriceFilter && (
                <div className="rounded-full bg-gray-700 px-4 py-1 flex justify-between gap-5 items-center">
                  <span className="text-sm font-medium text-white">
                    Price: {priceRange.min}$ - {priceRange.max}$
                  </span>
                  <button
                    type="button"
                    className="hover:bg-indigo-500 rounded-full p-.5"
                    onClick={resetFilter}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              {hasCategoryFilter && (
                <div className="rounded-full bg-gray-700 px-4 py-1 flex justify-between gap-5 items-center">
                  <span className="text-sm font-medium text-white">
                    Category: {selectedCategory}
                  </span>
                  <button
                    type="button"
                    className="hover:bg-indigo-500 rounded-full p-.5"
                    onClick={resetFilter}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {cardsList.length === filteredCardList.length ? (
            <span>Customers also purchased</span>
          ) : (
            <div className="filter-results">
              <h3>Results:</h3>
              <span className="text-sm font-medium text-gray-600">
                {filteredCardList.length} products found
              </span>
            </div>
          )}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredCardList.map(product => (
            <ProductCard
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
