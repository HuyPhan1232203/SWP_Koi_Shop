import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice"
import userReducer from "./features/userSlice"
import cartReducer from "./features/cartSlice"
import koiReducer from "./features/koiSlice"
import selectedItemsReducers from "./features/selectedItemsSlice"
import breedIdReducers from "./features/breedIdSlice"
import checkoutReducers from "./features/checkoutcart"
import orderProductReducer from "./features/orderedProduct"

export const rootReducer = combineReducers({
    counter:counterReducer,
    user:userReducer,
    cart: cartReducer,
    koi: koiReducer,
    selectedItems:selectedItemsReducers,
    breedId:breedIdReducers,
    checkout:checkoutReducers,
    orderProduct:orderProductReducer
});