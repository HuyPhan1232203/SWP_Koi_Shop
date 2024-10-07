import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addProduct:(state,action)=>{
            const product=action.payload;
            state.push(product);
        }
    }
})
export const {addProduct}=cartSlice.actions;
export default cartSlice;