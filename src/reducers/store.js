import { legacy_createStore } from "redux";
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import sagas from "../sagas";
import userLogin from "./user-login-Reducer";

const rootReducer = combineReducers({cartReducer,wishlistReducer,userLogin})
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export  let store = legacy_createStore(persistedReducer,applyMiddleware(sagaMiddleware))
export  let persistor = persistStore(store)
sagaMiddleware.run(sagas)