import * as actionTypes from "./actionTypes";

export const setData = (payload) => ({
  type: actionTypes.SET_DATA,
  payload,
});

export const setId = (payload) => ({
  type: actionTypes.SET_ID,
  payload,
});

export const setTooltip = (payload) => ({
  type: actionTypes.SET_TOOLTIP,
  payload,
});

export const setMouse = (payload) => ({
  type: actionTypes.SET_MOUSE,
  payload,
});

export const setMap = (payload) => ({
  type: actionTypes.SET_MAP,
  payload,
});

export default setData;
