import { useEffect, useState } from 'react';

import ImageModal from '../../components/ImageModal/ImageModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useBodyClass } from '../../store/catalog/hooks';
import FilterProducts from '../../components/FilterProducts/FilterProducts';

import { getCatalogApi } from '../../API/requests/catalog';
import { DataImage } from '../../types/catalog';

const CatalogPage = () => {
  const [dataImage, setDataImage] = useState<DataImage | null>(null);
  const dispatch = useAppDispatch();
  const { cardsList, minPrice, maxPrice } = useAppSelector(state => state.catalog);

  const filteredCardList = cardsList.filter(
    item => item.price >= minPrice && item.price <= maxPrice,
  );

  useEffect(() => {
    dispatch(getCatalogApi({ minPrice, maxPrice }));
  }, [minPrice, maxPrice, dispatch]);

  useEffect(() => {
    console.log('cardsList:', cardsList);
  }, [cardsList]);

  const openImageSlider = (data: DataImage) => {
    setDataImage(data);
  };

  const closeImageSlider = () => {
    setDataImage(null);
  };

  useBodyClass('lock', !!dataImage);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 position: relative">
        <FilterProducts />

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredCardList.map(({ description, id, images, name, price }) => (
            <div
              key={id}
              className="group flex flex-col rounded-md border-2"
              onClick={() => openImageSlider({ images, id })}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:cursor-pointer group-hover:opacity-75 lg:h-80">
                <img
                  src={images[0].url}
                  alt={name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="flex flex-col flex-auto p-2 pt-5 group-hover:cursor-pointer">
                <h3 className="text-sm text-gray-700 mb-4">{name}</h3>
                <p className="text-sm font-medium text-gray-900 justify-items-center">
                  {description}
                </p>
                <p className="text-sm font-medium text-gray-900 justify-items-center">
                  {price}$
                </p>
              </div>
            </div>
          ))}
        </div>
        {dataImage && <ImageModal dataImage={dataImage} onClose={closeImageSlider} />}
      </div>
    </div>
  );
};

export default CatalogPage;
