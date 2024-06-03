import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import CheckOutReducer from "./components/State/Slice/CheckOutSlice"
import cartReducer from "./components/State/Slice/CartSlice"
export const store = configureStore({
  reducer: {
    checkout:CheckOutReducer,
    cart:cartReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;