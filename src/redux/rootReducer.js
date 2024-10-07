import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice"
import cartReducer from "../redux/features/cartSlice"
import counterReducer from "../redux/features/counterSlice"

export const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer,
    counter:counterReducer
});