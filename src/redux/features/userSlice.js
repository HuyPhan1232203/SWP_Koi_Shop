import { createSlice } from "@reduxjs/toolkit";
const initialState={
    value:null,
}
const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state=action.payload;
            return state;
        },
        logout:()=>{
            return null;
        }
    }
})
export const {login,logout}=userSlice.actions;
export default userSlice.reducer;