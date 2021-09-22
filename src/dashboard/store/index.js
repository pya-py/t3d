import { createStore } from "redux";
import { reducers } from "../reducers";

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //temp: enable chrome redux manager extension
);

//dispatch
// store.subscribe(() => console.log(store.getState()));