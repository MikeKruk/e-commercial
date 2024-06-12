import React, { useRef, useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './FilterProduct.css';
import { useBodyClass, useClickOutside } from '../../store/catalog/hooks';
import UFilterButton from '../UI/UFilterButton/UFilterButton';

const FilterProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(150);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState(false);
  const [isFilterChange, setIsFilterChange] = useState(false);

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
    setMinPrice(value);
    watchFilterState();
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) return;
    setMaxPrice(value);
    watchFilterState();
  };

  const onSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
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
    setMinPrice(0);
    setMaxPrice(150);
    setSelectedSize('');
    setSelectedDiscount(false);
    setIsFilterChange(false);
  };

  const handleApplyFilter = () => {
    console.log('Apply filter');
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
                      <input type="number" value={minPrice} onChange={handleMinPrice} />
                    </label>
                    <label>
                      Max:
                      <input type="number" value={maxPrice} onChange={handleMaxPrice} />
                    </label>
                  </div>
                  <Slider
                    range
                    min={0}
                    max={150}
                    value={[minPrice, maxPrice]}
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
                    isDisabled={!isFilterChange}
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
