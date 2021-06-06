import jwt from './jwtReducer';

import {combineReducers} from 'redux';

const allReducers = combineReducers({
  jwt,
});

export default allReducers;
