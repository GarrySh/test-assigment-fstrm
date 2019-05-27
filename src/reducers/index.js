import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const UIstate = handleActions({}, {});

export default combineReducers({
  UIstate,
});
