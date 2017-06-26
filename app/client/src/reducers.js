import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // combine all your reducers here
  routing: routerReducer,
});

export default rootReducer;
