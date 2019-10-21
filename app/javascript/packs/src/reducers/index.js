import { combineReducers } from 'redux';
import authentication from './authentication';
import foos from './foos';

export default combineReducers({
  authentication,
  foos,
});
