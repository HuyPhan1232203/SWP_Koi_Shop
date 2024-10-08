import { createSlice } from "@reduxjs/toolkit";
const initialState={
    value:null,
}
const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            return state=action.payload;
        },
        logout:()=>{
            return null;
        }
    }
})
export const {login,logout}=userSlice.actions;
export default userSlice.reducer;