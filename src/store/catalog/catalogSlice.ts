/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCatalogApi,
  getCategoriesApi,
  getSearchProductsApi,
} from '../../API/requests/catalog';

import { CatalogState } from '../../types/catalog';
import { MAX_PRICE, SORT_TITLES } from '../../constants/constants';

const initialState: CatalogState = {
  cardsList: [],
  searchCardsList: [],
  statusGetAllActsTypes: '',
  errorGetAllActsTypes: null,
  priceRange: { min: 0, max: MAX_PRICE },
  selectedDiscount: false,
  selectedCategory: { name: '', id: '' },
  sortedValue: SORT_TITLES.NO_SORTING,
  categoriesList: [],
  searchValue: '',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<{ min?: number; max?: number }>) => {
      state.priceRange = { ...state.priceRange, ...action.payload };
    },
    setSelectedDiscount: (state, action: PayloadAction<boolean>) => {
      state.selectedDiscount = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<{ name: string; id: string }>) => {
      state.selectedCategory = action.payload;
    },
    setSortedValue: (state, action: PayloadAction<string>) => {
      state.sortedValue = action.payload;
    },
    setCategoties: (state, action: PayloadAction<string>) => {
      state.sortedValue = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCatalogApi.pending, state => {
        state.statusGetAllActsTypes = 'loading';
        state.errorGetAllActsTypes = null;
      })
      .addCase(getCatalogApi.fulfilled, (state, action) => {
        state.statusGetAllActsTypes = 'succeeded';
        state.cardsList = action.payload;
      })
      .addCase(getCatalogApi.rejected, (state, action) => {
        state.statusGetAllActsTypes = 'failed';
        state.errorGetAllActsTypes = action.error.message ?? null;
      })
      .addCase(getSearchProductsApi.pending, state => {
        state.statusGetAllActsTypes = 'loading';
        state.errorGetAllActsTypes = null;
      })
      .addCase(getSearchProductsApi.fulfilled, (state, action) => {
        console.log('slice', action.payload);
        state.statusGetAllActsTypes = 'succeeded';
        state.searchCardsList = action.payload;
      })
      .addCase(getSearchProductsApi.rejected, (state, action) => {
        state.statusGetAllActsTypes = 'failed';
        state.errorGetAllActsTypes = action.error.message ?? null;
      })
      .addCase(getCategoriesApi.pending, state => {
        state.statusGetAllActsTypes = 'loading';
        state.errorGetAllActsTypes = null;
      })
      .addCase(getCategoriesApi.fulfilled, (state, action) => {
        state.statusGetAllActsTypes = 'succeeded';
        state.categoriesList = action.payload;
      })
      .addCase(getCategoriesApi.rejected, (state, action) => {
        state.statusGetAllActsTypes = 'failed';
        state.errorGetAllActsTypes = action.error.message ?? null;
      });
  },
});

export const {
  setPrice,
  setSelectedDiscount,
  setSelectedCategory,
  setSortedValue,
  setSearchValue,
} = catalogSlice.actions;
export default catalogSlice.reducer;
