import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:null,
    reducers:{
        login:(state,action)=>{
            state=action.payload;
            console.log(state)
            return state;
        },
        logout:()=>{
            return null;
        }
    }
})
export const {login,logout}=userSlice.actions;
export default userSlice.reducer;