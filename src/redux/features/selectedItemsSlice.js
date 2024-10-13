import { createSlice } from "@reduxjs/toolkit";

const SelectedItemsSlice=createSlice({
    name:"selected-items",
    initialState:[],
    reducers:{
        addSelectedItem:(state,action)=>{
            const item=action.payload;
            state.push(item);
        },
        clearAllSelectedItem:()=>[]
    }
})
export const {addSelectedItem,clearAllSelectedItem} =SelectedItemsSlice.actions;
export default SelectedItemsSlice.reducer;