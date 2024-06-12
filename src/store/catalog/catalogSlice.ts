/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCatalogApi } from '../../API/requests/catalog';

import { CatalogState } from '../../types/catalog';
import { MAX_PRICE } from '../../constants/constants';

const initialState: CatalogState = {
  cardsList: [],
  statusGetAllActsTypes: '',
  errorGetAllActsTypes: null,
  minPrice: 0,
  maxPrice: MAX_PRICE,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
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
      });
  },
});

export const { setMinPrice, setMaxPrice } = catalogSlice.actions;
export default catalogSlice.reducer;
