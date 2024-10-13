import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice"
import userReducer from "./features/userSlice"
import cartReducer from "./features/cartSlice"
import koiReducer from "./features/koiSlice"
import selectedItemsReducers from "./features/selectedItemsSlice"

export const rootReducer = combineReducers({
    counter:counterReducer,
    user:userReducer,
    cart: cartReducer,
    koi: koiReducer,
    selectedItems:selectedItemsReducers
});