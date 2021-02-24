import { createStore } from "redux";
import { initialState } from "./redux/initialState";
import { rootReducer } from "./redux/index";

export const store = createStore(rootReducer, initialState);
