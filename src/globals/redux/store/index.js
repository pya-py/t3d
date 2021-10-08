import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

export const store = createStore(
    reducers,
    applyMiddleware(thunk));

//dispatch
// store.subscribe(() => console.log(store.getState()));