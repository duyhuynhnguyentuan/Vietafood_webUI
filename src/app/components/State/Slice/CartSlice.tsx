import { createSlice } from "@reduxjs/toolkit";

// Define the type for a cart item
interface CartItem {
    productKey?: string;
    name?: string;
    description?: string;
    guideToUsing?: string;
    weight?: string;
    expiryDay?: string;
    imageUrl?: string;
    quantity?: number;
    status?: number;
    price?: number;
    amount: number;
}

// Define the initial state
interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

// Create the slice
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.amount++;
      const cartItem = state.cartItems.find(
        (cartItem) => cartItem.productKey === action.payload.productKey
      );
      if (cartItem) {
        cartItem.amount += 1;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.amount * (item.price || 0)), 0);
    },
    increase: (state, action) => {
      state.amount++;
      const itemIndex = state.cartItems.findIndex(cartItem => cartItem.productKey === action.payload.productKey);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].amount += 1;
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.amount * (item.price || 0)), 0);
    },
    decrease: (state, action) => {
      const itemIndex = state.cartItems.findIndex(cartItem => cartItem.productKey === action.payload.productKey);
      if (itemIndex !== -1 && state.cartItems[itemIndex].amount > 0) {
        state.cartItems[itemIndex].amount -= 1;
        state.amount--;
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.amount * (item.price || 0)), 0);
    },
    remove: (state, action) => {
      const cartItem = state.cartItems.find(cartItem => cartItem.productKey === action.payload.productKey);
      if (cartItem) {
        state.cartItems = state.cartItems.filter(item => item.productKey !== cartItem.productKey);
        state.amount -= cartItem.amount;
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.amount * (item.price || 0)), 0);
    },
    total: (state) => {
      state.total = state.cartItems.reduce((total, cartItem) => total + (cartItem.amount * (cartItem.price || 0)), 0);
    }
  },
});

export const { add, increase, decrease, remove, total } = CartSlice.actions;
export default CartSlice.reducer;
