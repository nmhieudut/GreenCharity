import { actionTypes } from "./types";

const initialState = {
  loading: false,
  currentUser: null,
  logInError: null,
  signUpError: null
};

export default function authReducer(state = initialState, action) {
  console.log("action: ", action, state);
  switch (action.type) {
    case actionTypes.LOG_IN:
      return { ...state, loading: true, logInError: null };
    case actionTypes.LOG_IN_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case actionTypes.LOG_IN_FAILED:
      return { ...state, loading: false, logInError: action.payload };
    case actionTypes.SIGN_UP:
      return { ...state, loading: true, signUpError: null };
    case actionTypes.SIGN_UP_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case actionTypes.SIGN_UP_FAILED:
      return { ...state, loading: false, signUpError: action.payload };
    case actionTypes.SET_CURRENT_USER:
      return { ...state, loading: false, currentUser: action.payload };
    default:
      return { ...state };
  }
}
