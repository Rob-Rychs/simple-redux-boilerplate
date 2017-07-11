import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homePageContainer from './containers/HomePageContainer/reducer';

const rootReducer = combineReducers({
  // combine all your reducers here
  routing: routerReducer,
  homePageContainer,
});

export default rootReducer;
