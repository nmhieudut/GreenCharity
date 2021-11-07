import { actionTypes } from "./types";
export const ModalActions = {
  setModalOn() {
    return {
      type: actionTypes.SET_MODAL_ON
    };
  },
  setModalOff() {
    return {
      type: actionTypes.SET_MODAL_OFF
    };
  }
};
