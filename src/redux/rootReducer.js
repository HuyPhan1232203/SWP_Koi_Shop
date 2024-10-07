import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/features/counterSlice"
export const rootReducer = combineReducers({
      user:userReducer,  
});