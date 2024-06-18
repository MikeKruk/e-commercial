import { IProductCardProps } from '../../types/catalog';
import { DISCOUNT_VALUE } from '../../constants/constants';

const ProductCard: React.FC<IProductCardProps> = ({
  description,
  id,
  images,
  name,
  price,
  discount,
  onClick,
}) => {
  return (
    <div
      key={id}
      className="group flex flex-col rounded-md border-2 relative"
      onClick={() => onClick({ images, id })}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:cursor-pointer group-hover:opacity-75 lg:h-80">
        <img
          src={images[0].url}
          alt={name}
          className="h-full w-full object-contain object-center bg-white lg:h-full lg:w-full"
        />
      </div>
      <div className="flex flex-col flex-auto p-2 pt-5 group-hover:cursor-pointer">
        <h3 className="text-md font-medium text-gray-900 mb-4">{name}</h3>
        <p className="text-sm font-light text-gray-700 justify-items-center grow mb-4 line-clamp-3">
          {description}
        </p>
        <p className="text-xl font-medium text-gray-900 justify-items-center flex items-center">
          <span className={price > DISCOUNT_VALUE ? 'line-through' : ''}>{price}$</span>
          {price > DISCOUNT_VALUE && (
            <span className="text-green-600 ml-2">{discount}$</span>
          )}
        </p>
      </div>
      {price > DISCOUNT_VALUE && (
        <span className="ml-2 px-2 py-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-bold rounded-full flex items-center justify-center flex-grow uppercase absolute right-1 top-1">
          sale
        </span>
      )}
    </div>
  );
};

export default ProductCard;
