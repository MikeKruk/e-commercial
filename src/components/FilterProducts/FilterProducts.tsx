import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './FilterProduct.css';
import { useBodyClass, useClickOutside } from '../../store/catalog/hooks';
import UFilterButton from '../UI/UFilterButton/UFilterButton';
import UFilterSelect from '../UI/UFilterSelect/UFilterSelect';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setPrice,
  setSelectedCategory,
  setSelectedDiscount,
} from '../../store/catalog/catalogSlice';
import { MAX_PRICE } from '../../constants/constants';

const FilterProducts = () => {
  const dispatch = useAppDispatch();

  const { priceRange, selectedCategory } = useAppSelector(state => state.catalog);

  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedDiscount, setLocalSelectedDiscount] = useState(false);
  const [isFilterChange, setIsFilterChange] = useState(false);

  const [priceFilter, setPriceFilter] = useState({
    min: priceRange.min,
    max: priceRange.max,
  });

  const [categoryFilter, setCategoryFilter] = useState(selectedCategory);

  const watchFilterState = () => {
    setIsFilterChange(true);
  };

  useEffect(() => {
    setPriceFilter({ min: priceRange.min, max: priceRange.max });
    setCategoryFilter(selectedCategory);
  }, [priceRange, selectedCategory]);

  const showOptions = () => {
    setIsOpen(!isOpen);
  };

  const closeOptions = () => {
    setIsOpen(false);
  };

  const selectMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) return;
    setPriceFilter({ ...priceFilter, min: value });
    dispatch(setPrice({ min: value }));
    watchFilterState();
  };

  const selectMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) return;
    setPriceFilter({ ...priceFilter, max: value });
    dispatch(setPrice({ max: value }));
    watchFilterState();
  };

  const onSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceFilter({ ...priceFilter, min: value[0], max: value[1] });
      watchFilterState();
    }
  };

  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    watchFilterState();
  };

  const selectDiscount = () => {
    setLocalSelectedDiscount(!localSelectedDiscount);
    watchFilterState();
  };

  const resetFilter = () => {
    setPriceFilter({ min: 0, max: MAX_PRICE });
    setCategoryFilter('');
    setLocalSelectedDiscount(false);
    setIsFilterChange(false);
    dispatch(setPrice({ min: 0, max: MAX_PRICE }));
    dispatch(setSelectedDiscount(false));
    dispatch(setSelectedCategory(''));
  };

  const applyFilter = () => {
    dispatch(setPrice({ min: priceFilter.min, max: priceFilter.max }));
    dispatch(setSelectedDiscount(localSelectedDiscount));
    dispatch(setSelectedCategory(categoryFilter));
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
                        value={priceFilter.min}
                        onChange={selectMinPrice}
                      />
                    </label>
                    <label>
                      Max:
                      <input
                        type="number"
                        value={priceFilter.max}
                        onChange={selectMaxPrice}
                      />
                    </label>
                  </div>
                  <Slider
                    range
                    min={0}
                    max={MAX_PRICE}
                    value={[priceFilter.min, priceFilter.max]}
                    onChange={onSliderChange}
                    allowCross={false}
                  />
                </div>
              </div>
              <div className="filter filter-sidebar__size">
                <h3 className="text-2xl font-regular tracking-tight text-gray-900 mb-4">
                  Category
                </h3>
                <div className="category">
                  <div className="select-group flex justify-between text-gray-900">
                    <UFilterSelect
                      title="For Men"
                      value={categoryFilter}
                      onChange={e => selectCategory(e)}
                    />
                    <UFilterSelect
                      title="For Women"
                      value={categoryFilter}
                      onChange={e => selectCategory(e)}
                    />
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
                        checked={localSelectedDiscount}
                        onChange={selectDiscount}
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
                      priceFilter.min === 0 &&
                      priceFilter.max === MAX_PRICE
                    }
                    text="Reset"
                    className="flex items-center"
                    onClick={resetFilter}
                  />
                </div>
                <div className="apply">
                  <UFilterButton
                    isDisabled={false}
                    text="Apply"
                    className="flex items-center"
                    onClick={applyFilter}
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
