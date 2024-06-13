import React, { useRef, useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './FilterProduct.css';
import { useBodyClass, useClickOutside } from '../../store/catalog/hooks';
import UFilterButton from '../UI/UFilterButton/UFilterButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMinPrice, setMaxPrice } from '../../store/catalog/catalogSlice';
import { MAX_PRICE } from '../../constants/constants';

const FilterProducts = () => {
  const { minPrice, maxPrice } = useAppSelector(state => state.catalog);

  const [isOpen, setIsOpen] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState(false);
  const [isFilterChange, setIsFilterChange] = useState(false);

  const dispatch = useAppDispatch();

  const watchFilterState = () => {
    setIsFilterChange(true);
  };

  const showOptions = () => {
    setIsOpen(!isOpen);
  };

  const closeOptions = () => {
    setIsOpen(false);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) return;
    setLocalMinPrice(value);
    dispatch(setMinPrice(value));
    watchFilterState();
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) return;
    setLocalMaxPrice(value);
    dispatch(setMaxPrice(value));
    watchFilterState();
  };

  const onSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalMinPrice(value[0]);
      setLocalMaxPrice(value[1]);
      watchFilterState();
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(e.target.value);
    watchFilterState();
  };

  const handleDiscount = () => {
    setSelectedDiscount(!selectedDiscount);
    watchFilterState();
  };

  const handleResetFilter = () => {
    setLocalMinPrice(0);
    setLocalMaxPrice(MAX_PRICE);
    setSelectedSize('');
    setSelectedDiscount(false);
    setIsFilterChange(false);
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(MAX_PRICE));
  };

  const handleApplyFilter = () => {
    dispatch(setMinPrice(localMinPrice));
    dispatch(setMaxPrice(localMaxPrice));
    setIsOpen(false);
  };

  const sidebarRef = useRef<HTMLDivElement>(null);
  useClickOutside(sidebarRef, () => setIsOpen(false));

  useBodyClass('lock', isOpen);

  return (
    <div className="filter-products">
      <button
        type="button"
        aria-label="filter"
        className="filter-btn"
        onClick={showOptions}
      >
        <FaFilter fill="#374151" />
      </button>
      {isOpen && (
        <div className="filter-sidebar__overlay">
          <div className="filter-sidebar__container" ref={sidebarRef}>
            <div className="filter-sidebar__header">
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">Filters</h3>
              <button
                className="filter-sidebar__close"
                aria-label="close"
                type="button"
                onClick={closeOptions}
              >
                <FaTimes />
              </button>
            </div>
            <div className="filters-sidebar__body">
              <div className="filter filter-sidebar__price">
                <h3 className="text-2xl font-regular tracking-tight text-gray-900 mb-4">
                  Price, $
                </h3>
                <div className="range">
                  <div className="input-group">
                    <label>
                      Min:
                      <input
                        type="number"
                        value={localMinPrice}
                        onChange={handleMinPrice}
                      />
                    </label>
                    <label>
                      Max:
                      <input
                        type="number"
                        value={localMaxPrice}
                        onChange={handleMaxPrice}
                      />
                    </label>
                  </div>
                  <Slider
                    range
                    min={0}
                    max={MAX_PRICE}
                    value={[localMinPrice, localMaxPrice]}
                    onChange={onSliderChange}
                    allowCross={false}
                  />
                </div>
              </div>
              <div className="filter filter-sidebar__size">
                <h3 className="text-2xl font-regular tracking-tight text-gray-900 mb-4">
                  Size
                </h3>
                <div className="size">
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        value="S"
                        checked={selectedSize === 'S'}
                        onChange={handleSizeChange}
                      />
                      S
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="M"
                        checked={selectedSize === 'M'}
                        onChange={handleSizeChange}
                      />
                      M
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="L"
                        checked={selectedSize === 'L'}
                        onChange={handleSizeChange}
                      />
                      L
                    </label>
                  </div>
                </div>
              </div>
              <div className="filter filter-sidebar__discount">
                <h3 className="text-2xl font-regular tracking-tight text-gray-900 mb-4">
                  Discount
                </h3>
                <div className="discount">
                  <div className="radio-group">
                    <label>
                      <input
                        type="checkbox"
                        value="select"
                        checked={selectedDiscount}
                        onChange={handleDiscount}
                      />
                      Show only discount products
                    </label>
                  </div>
                </div>
              </div>
              <div className="filter filter-sidebar__btn-block">
                <div className="reset">
                  <UFilterButton
                    isDisabled={
                      !isFilterChange &&
                      localMinPrice === 0 &&
                      localMaxPrice === MAX_PRICE
                    }
                    text="Reset"
                    className="flex items-center"
                    onClick={handleResetFilter}
                  />
                </div>
                <div className="apply">
                  <UFilterButton
                    isDisabled={false}
                    text="Apply"
                    className="flex items-center"
                    onClick={handleApplyFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterProducts;
