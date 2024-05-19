// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     currentUser: [],
//     cart: [],
//   },
//   reducers: {
//     addItemToCart: (state, {payload}) => {
//         let newCart = [...state.cart];
//         const found state.cart.find(({id}) => {
//             id === payload.id
//         })
//         if(found) {
//             newCart.map((item) => {
//                 return item.id === payload.id
//                 ? {...item, quantity: payload.quantity || item.quantity + 1}
//                 : item
//             }) else {
//                newCart.push({payload, quantity: 1})
//             }
//         }
//         state.cart = newCart
//     }
//   },

// });

// export const {addItemToCart} = userSlice.actions

// export default userSlice.reducer

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from '..';

export interface UserState {
  currentUser: string | null;
  cart: string[];
}

const initialState: UserState = {
  currentUser: null,
  cart: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload;
    },
    resetUser: state => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = null;
    },
  },
});

export const { addUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

/* Selectors */

export const selectCurrentUser = (state: AppState) => state.user.currentUser;
