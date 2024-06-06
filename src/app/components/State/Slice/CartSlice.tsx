import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItem:[],
    amount: 0,
    total: 0,
};
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        
       add:(state,action)=>{
        state.amount = state.amount + 1;

       } 
    }
});
export const {add} = CartSlice.actions;
export default CartSlice.reducer;