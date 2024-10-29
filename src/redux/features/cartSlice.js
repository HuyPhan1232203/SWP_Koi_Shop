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
        changePrice:(state,action)=>{
            console.log(action.payload.price);
            const result=state.find(koi=>koi.price==action.payload.price);
            result.price=action.payload.salePrice;
        },
        clearAll: () => []
    },
})
export const {addProduct, clearAll,removeProduct,changePrice}= cartSlice.actions;
export default cartSlice.reducer;