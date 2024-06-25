import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

import './Search.css';
import { setSearchValue } from '../../store/catalog/catalogSlice';
import { useAppDispatch } from '../../store/hooks';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const searchProduct = () => dispatch(setSearchValue(inputValue));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchProduct();
    }
  };

  const clearInput = () => {
    setInputValue('');
    dispatch(setSearchValue(''));
  };

  return (
    <div className="flex bg-white w-full shadow-search-shadow border-gray-300 border-2 items-center  mb-20 rounded-[5px] overflow-hidden">
      <div className="w-full">
        <input
          placeholder="Search..."
          className="search__input border-none w-full h-full focus:outline-none focus:ring-0 text-xl text-gray-700 "
          value={inputValue}
          onChange={enterText}
          onKeyDown={onKeyDown}
        />
      </div>
      <button
        type="button"
        aria-label="search"
        className="p-2 transition-all duration-200 easy-linear hover:bg-gray-300 rounded-full"
        onClick={searchProduct}
      >
        <FaSearch fill="#374151" />
      </button>
      <hr className="m-1 h-10 w-[1px] bg-gray-500" />
      <button
        type="button"
        aria-label="close"
        className="p-2 transition-all duration-200 easy-linear hover:bg-gray-300 rounded-full"
        onClick={clearInput}
      >
        <FaTimes fill="#374151" />
      </button>
    </div>
  );
};

export default Search;
