import { actionTypes } from "./types";

const initialState = {
  loading: false,
  currentUser: null,
  error: null
};

export default function authReducer(state = initialState, action) {
  console.log("action: ", action);
  switch (action.type) {
    case actionTypes.LOG_IN:
      return { ...state, loading: true };
    case actionTypes.LOG_IN_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload.user };
    case actionTypes.LOG_IN_FAILED:
      return { ...state, loading: false, error: action.payload.message };
    case actionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return { ...state };
  }
}
