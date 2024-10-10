import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addProduct:(state,action)=> {
            const product = action.payload;
            const existProduct = state.find((koi) => koi.id === product.id)
            if(existProduct) {
                existProduct.quantity += 1;
            } else {
            state.push({...product, quantity: 1});
            }
        },
        clearAll: () => {
            return[];
        }
    },
})
export const {addProduct, clearAll}= cartSlice.actions;
export default cartSlice.reducer;