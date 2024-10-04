import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from "../../src/redux/feature/conterSlice"

export const rootReducer = combineReducers({
      counter:counterReducer,
})