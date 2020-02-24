import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { hotels } from './hotel.reducer';
import { common } from './common.reducer'

const rootReducer = combineReducers({
  authentication,
  hotels,
  common
});

export default rootReducer;