import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const rootReducer=combineReducers({user:userReducer})

const persistConfig={  //setting name of key in local storage,version and storage.
  key:'root',
  storage,
  version:1,

} 
const persistedReducer =persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false,
  }),
});

export const persistor = persistStore(store)

