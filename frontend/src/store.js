import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { reducer } from "./reducer";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
let persistor = persistStore(store);

export { store, persistor };
