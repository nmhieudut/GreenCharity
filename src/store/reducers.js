import { combineReducers } from 'redux';
import auth from './auth/reducer';
import modal from './modal/reducer';
const rootReducer = combineReducers({
  auth,
  modal
});
export default rootReducer;
