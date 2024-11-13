import { createSlice } from "@reduxjs/toolkit";

const checkOutSlice=createSlice({
    name:"checkout",
    initialState:null,
    reducers:{
        storeProduct:(state,action)=>{
            return state=action.payload;
        }
    }
})
export const {storeProduct} = checkOutSlice.actions
export default checkOutSlice.reducer;
