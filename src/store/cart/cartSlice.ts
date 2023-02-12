import { Product } from '@/typings';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (
      state: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload.id
      );
      let newCart = [...state.items];
      if (index >= 0) newCart.splice(index, 1);
      else
        console.log(
          `Can not remove product (id: ${action.payload.id}),it's not in the cart`
        );

      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsWithId = (state: RootState, id: string) =>
  state.cart.items.filter((item) => item._id === id);

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.price, 0);
export const useAppdispatch: () => AppDispatch = useDispatch;

export default cartSlice.reducer;
