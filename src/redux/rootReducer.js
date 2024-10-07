import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice"
export const rootReducer = combineReducers({
    user:userReducer
});