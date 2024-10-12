import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addProduct:(state,action)=> {
            const product = action.payload;
            state.push(product);
        },
        removeProduct: (state, action) => { 
            const productId = action.payload;
             return state.filter(product => product.id !== productId);
        },
        clearAll: () => []
    },
})
export const {addProduct, clearAll,removeProduct}= cartSlice.actions;
export default cartSlice.reducer;