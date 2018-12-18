/**
 * Created by John.Doe on 7/11/2018.
 */
import { combineReducers } from 'redux';
import auth from './reducers/auth';
import nav from './reducers/nav';

export default combineReducers({
  auth,
  nav,
});
