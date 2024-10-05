import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from "./features/counterSlide"

export const rootReducer = combineReducers({
      counter:counterReducer,
})