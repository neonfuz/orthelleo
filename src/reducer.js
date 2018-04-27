import { combineReducers } from 'redux';

import othelloReducer from './components/Othello/reducer';

export default combineReducers({
  othello: othelloReducer,
});
