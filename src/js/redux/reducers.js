import * as actionTypes from "./actionTypes";
import { initialState } from "./initialState";

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IMAGES:
      return { ...state, photos: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
