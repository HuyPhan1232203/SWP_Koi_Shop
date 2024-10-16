import { createSlice } from "@reduxjs/toolkit";

const breedIdSlice=createSlice({
    name:"breedId",
    initialState:"",
    reducers:{
        storeBreedId:(state,action)=>{
            return state=action.payload;
        }
    }
})
export const {storeBreedId}=breedIdSlice.actions;
export default breedIdSlice.reducer;
