/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCatalogApi } from '../../API/requests/catalog';

import { CatalogState } from '../../types/catalog';

const initialState: CatalogState = {
  cardsList: [],
  statusGetAllActsTypes: '',
  errorGetAllActsTypes: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
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

export default catalogSlice.reducer;
