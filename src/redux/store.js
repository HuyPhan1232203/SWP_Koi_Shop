import { persistStore, persistReducer } from 'redux-persist'
import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'roots',
  storage ,
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer:persistedReducer,
})
export const persistor =persistStore(store);