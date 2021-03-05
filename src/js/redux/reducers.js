import * as actionTypes from "./actionTypes";
import { initialState } from "./initialState";

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return { ...state, data: action.payload };
    case actionTypes.SET_ID:
      return { ...state, currentId: action.payload };
    case actionTypes.SET_TOOLTIP:
      return { ...state, tooltip: action.payload };
    case actionTypes.SET_MOUSE:
      return { ...state, mouse: action.payload };
    case actionTypes.SET_MAP:
      return { ...state, isMapOpened: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
