import { actionTypes } from "./types";

const initialState = {
  name: "Next boilerplate with redux saga"
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return { ...state };
    default:
      return { ...state };
  }
}
