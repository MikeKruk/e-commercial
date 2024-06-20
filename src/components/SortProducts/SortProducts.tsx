import React, { useState, useRef } from 'react';
import { FaSort } from 'react-icons/fa';

import './SortProducts.css';
import USortInput from '../UI/USortInput/USortInput';
import { SORT_TITLES } from '../../constants/constants';
import { useBodyClass, useClickOutside } from '../../store/catalog/hooks';
import { useAppDispatch } from '../../store/hooks';
import { setSortedValue } from '../../store/catalog/catalogSlice';

const SortProducts = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState(SORT_TITLES.NO_SORTING);
  const dispatch = useAppDispatch();

  const selectSortValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortValue(e.target.value);
    dispatch(setSortedValue(e.target.value));
    setIsSortOpen(false);
  };

  const showOptions = () => setIsSortOpen(!isSortOpen);

  useBodyClass('lock', isSortOpen);

  const sortRef = useRef<HTMLDivElement>(null);
  useClickOutside(sortRef, () => setIsSortOpen(false));

  return (
    <div className="relative" ref={sortRef}>
      <button type="button" aria-label="sort" className="sort-btn" onClick={showOptions}>
        <FaSort fill="#374151" />
      </button>
      {isSortOpen && (
        <div className="absolute top-full mt-2 w-60 bg-white rounded-md shadow-2xl p-3 z-10">
          <ul>
            {Object.values(SORT_TITLES).map(title => (
              <USortInput
                key={title}
                title={title}
                onChange={selectSortValue}
                value={title}
                checked={title === sortValue}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortProducts;
