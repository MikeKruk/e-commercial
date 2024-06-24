import { IUFilterSelect } from '../../../types/catalog';

const itemsForWomen = ['Boots', 'Dresses', 'Shirts', 'Bags'];
const itemsForMen = ['T-shirts', 'Suits', 'Jackets', 'Shoes'];

function UFilterSelect({ title, name = '', value, onChange }: IUFilterSelect) {
  const itemsToRender = title === 'For Men' ? itemsForMen : itemsForWomen;
  return (
    <label>
      {title}
      <select
        className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option value="" className="text-sm text-gray-400">
          Select your product
        </option>

        {itemsToRender.map((item, index) => (
          <option
            key={item}
            value={title === 'For Men' ? itemsForMen[index] : itemsForWomen[index]}
          >
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

export default UFilterSelect;
