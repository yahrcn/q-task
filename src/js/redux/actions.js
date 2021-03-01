import * as actionTypes from "./actionTypes";

export const setData = (payload) => ({
  type: actionTypes.SET_DATA,
  payload,
});

export default setData;
