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
  shippingFee: number;
  couponDiscount: number;
  finalTotal: number;
}

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
  shippingFee: 30000,
  couponDiscount: 0,
  finalTotal: 0
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
      state.finalTotal = (state.total + state.shippingFee) * (1 - state.couponDiscount / 100);
    },
    increase: (state, action) => {
      state.amount++;
      const itemIndex = state.cartItems.findIndex(cartItem => cartItem.productKey === action.payload.productKey);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].amount += 1;
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.amount * (item.price || 0)), 0);
      state.finalTotal = (state.total + state.shippingFee) * (1 - state.couponDiscount / 100);
    },
    decrease: (state, action) => {
      const itemIndex = state.cartItems.findIndex(cartItem => cartItem.productKey === action.payload.productKey);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].amount -= 1;
        state.amount--;
        if (state.cartItems[itemIndex].amount === 0) {
          state.cartItems.splice(itemIndex, 1);
        }
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.amount * (item.price || 0)), 0);
      state.finalTotal = (state.total + state.shippingFee) * (1 - state.couponDiscount / 100);
    },
    remove: (state, action) => {
      const cartItem = state.cartItems.find(cartItem => cartItem.productKey === action.payload.productKey);
      if (cartItem) {
        state.cartItems = state.cartItems.filter(item => item.productKey !== cartItem.productKey);
        state.amount -= cartItem.amount;
      }
      state.total = state.cartItems.reduce((total, item) => total + (item.amount * (item.price || 0)), 0);
      state.finalTotal = (state.total + state.shippingFee) * (1 - state.couponDiscount / 100);
    },
    total: (state) => {
      state.total = state.cartItems.reduce((total, cartItem) => total + (cartItem.amount * (cartItem.price || 0)), 0);
    },
    clear: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
      state.finalTotal = 0;
      state.couponDiscount = 0; // Reset coupon discount on clear
    },
    addCoupon: (state, action) => {
      state.couponDiscount = action.payload;
      state.finalTotal = (state.total + state.shippingFee) * (1 - state.couponDiscount / 100);
    },
    finalTotal: (state) => {
      if (state.couponDiscount !== 0) {
        state.finalTotal = (state.total + state.shippingFee) * (1 - state.couponDiscount / 100);
      } else {
        state.finalTotal = state.total + state.shippingFee;
      }
    },
    setShippingFee: (state, action) => {
      state.shippingFee = action.payload;
      state.finalTotal = (state.total + state.shippingFee) * (1 - state.couponDiscount / 100);
    }
  },
});

export const { add, increase, decrease, remove, total, clear, addCoupon, finalTotal, setShippingFee } = CartSlice.actions;
export default CartSlice.reducer;
