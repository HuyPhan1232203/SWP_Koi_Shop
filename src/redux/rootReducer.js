import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice"
import userReducer from "./features/userSlice"
import cartReducer from "./features/cartSlice"
import koiReducer from "./features/koiSlice"

export const rootReducer = combineReducers({
    counter:counterReducer,
    user:userReducer,
    cart: cartReducer,
    koi: koiReducer
});