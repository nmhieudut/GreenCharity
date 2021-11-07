import { actionTypes } from "./types";
export const AuthActions = {
  loginAction() {
    return {
      type: actionTypes.LOG_IN
    };
  },
  loginSuccessAction(payload) {
    return {
      type: actionTypes.LOG_IN_SUCCESS,
      payload
    };
  },
  loginFailedAction(payload) {
    return {
      type: actionTypes.LOG_IN_FAILED,
      payload
    };
  },

  signUpAction() {
    return {
      type: actionTypes.SIGN_UP
    };
  },

  signUpSuccessAction(payload) {
    return {
      type: actionTypes.SIGN_UP_SUCCESS,
      payload
    };
  },
  signUpFailedAction(payload) {
    return {
      type: actionTypes.SIGN_UP_FAILED,
      payload
    };
  },

  signOutAction() {
    return { type: actionTypes.SIGN_OUT };
  },

  setCurrentUserAction() {
    return {
      type: actionTypes.SET_CURRENT_USER
    };
  },
  setCurrentUserSuccessAction(payload) {
    return {
      type: actionTypes.SET_CURRENT_USER_SUCCESS,
      payload
    };
  },
  setCurrentUserFailedAction() {
    return {
      type: actionTypes.SET_CURRENT_USER_FAILED
    };
  }
};
