/* eslint-disable no-param-reassign */
// import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// import type { AppState } from '..';
import user from '../../API/requests/user';
import { IUserState } from '../../types/user';

const initialState: IUserState = {
  loading: 'idle',
  accessToken: null,
  currentUser: null,
  statusGetAllActsTypes: '',
  errorGetAllActsTypes: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(user.getAnonymousToken.pending, state => {
        state.statusGetAllActsTypes = 'loading';
        state.errorGetAllActsTypes = null;
      })
      .addCase(user.getAnonymousToken.fulfilled, (state, action) => {
        state.statusGetAllActsTypes = 'succeeded';
        state.accessToken = action.payload;
      })
      .addCase(user.getAnonymousToken.rejected, (state, action) => {
        state.statusGetAllActsTypes = 'failed';
        state.errorGetAllActsTypes = action.error.message ?? null;
      })
      .addCase(user.getCustomerToken.pending, state => {
        state.statusGetAllActsTypes = 'loading';
        state.errorGetAllActsTypes = null;
      })
      .addCase(user.getCustomerToken.fulfilled, (state, action) => {
        state.statusGetAllActsTypes = 'succeeded';
        state.accessToken = action.payload;
      })
      .addCase(user.getCustomerToken.rejected, (state, action) => {
        state.statusGetAllActsTypes = 'failed';
        state.errorGetAllActsTypes = action.error.message ?? null;
      })
      .addCase(user.createUser.pending, state => {
        state.statusGetAllActsTypes = 'loading';
        state.errorGetAllActsTypes = null;
      })
      .addCase(user.createUser.fulfilled, (state, action) => {
        state.statusGetAllActsTypes = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(user.createUser.rejected, (state, action) => {
        state.statusGetAllActsTypes = 'failed';
        state.errorGetAllActsTypes = action.error.message ?? null;
      })
      .addCase(user.loginUser.pending, state => {
        state.statusGetAllActsTypes = 'loading';
        state.errorGetAllActsTypes = null;
      })
      .addCase(user.loginUser.fulfilled, (state, action) => {
        state.statusGetAllActsTypes = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(user.loginUser.rejected, (state, action) => {
        state.statusGetAllActsTypes = 'failed';
        state.errorGetAllActsTypes = action.error.message ?? null;
      });
  },
});

// export const { addUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

/* Selectors */

// export const selectCurrentUser = (state: AppState) => state.user.currentUser;
