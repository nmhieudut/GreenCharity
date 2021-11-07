import { actionTypes } from "./types";

const initialState = {
  globalLoading: false
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MODAL_ON:
      return { globalLoading: true };
    case actionTypes.SET_MODAL_OFF:
      return { globalLoading: false };

    default:
      return { ...state };
  }
}
