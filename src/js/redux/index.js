import { SET_IMAGES } from "./actionTypes";
import { initialState } from "./initialState";

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES:
      return { ...state, photos: action.payload };
    default:
      return state;
  }
}
