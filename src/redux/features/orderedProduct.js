import { createSlice } from "@reduxjs/toolkit";

const OrderedProduct=createSlice({
    name:"orderProduct",
    initialState:null,
    reducers:{
        storeOrder:(state,action)=>{
            return state=action.payload;
        }
    }
})
export const{storeOrder} =OrderedProduct.actions;
export default OrderedProduct.reducer;