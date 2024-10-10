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
            const productToRemove = action.payload;
            return state.filter(product => product.id !== productToRemove.id);
        },
        clearAll: () => []
    },
})
export const {addProduct, clearAll}= cartSlice.actions;
export default cartSlice.reducer;