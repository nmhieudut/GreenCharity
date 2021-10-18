import { actionTypes } from "./types";
export const AuthActions = {
  loginAction() {
    return {
      type: actionTypes.LOG_IN
    };
  },

  signUpAction(payload) {
    return {
      type: actionTypes.SIGN_UP,
      payload
    };
  },

  signOutAction() {
    return { type: actionTypes.SIGN_OUT };
  },

  setCurrentUserAction(payload) {
    return {
      type: actionTypes.SET_CURRENT_USER,
      payload
    };
  }
};
