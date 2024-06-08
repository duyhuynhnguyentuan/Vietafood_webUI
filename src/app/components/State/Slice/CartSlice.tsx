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
      state.amount = state.amount + 1;
      const cartItem = state.cartItems.find(
        (cartItem) => cartItem.productKey === action.payload.productKey
      );
      if (cartItem) {
        cartItem.amount = cartItem.amount + 1;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
    },
  },
});

export const { add } = CartSlice.actions;
export default CartSlice.reducer;
