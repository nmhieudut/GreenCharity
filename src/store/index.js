import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { createStore } from "redux";
import rootReducer from "./reducers";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
    if (state.auth) nextState.auth = state.auth;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export const makeStore = context => {
  const store = createStore(reducer);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
