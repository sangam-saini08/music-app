import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import roootReducers from "./reducers";

export const Store = createStore(roootReducers, applyMiddleware(thunk));
