import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import {
  initialState as homePageContainer,
} from './containers/HomePageContainer/reducer';

import {
  initialState as categoriesContainer,
} from './containers/CategoriesContainer/reducer';

import {
  initialState as postsByCategoryContainer,
} from './containers/PostsByCategoryContainer/reducer';

import {
  initialState as singlePostContainer,
} from './containers/SinglePostContainer/reducer';

import {
  initialState as newPostContainer,
} from './containers/NewPostContainer/reducer';

import {
  initialState as editCommentContainer,
} from './containers/EditCommentFormContainer/reducer';

import {
  initialState as editPostContainer,
} from './containers/EditPostFormContainer/reducer';

const initialState = {
  // collect initialState from all your containers
  homePageContainer,
  categoriesContainer,
  postsByCategoryContainer,
  singlePostContainer,
  newPostContainer,
  editPostContainer,
  editCommentContainer,
};

const loggerMiddleware = createLogger();
const routingMiddleware = routerMiddleware(createHistory());
const middlewares = [thunk, loggerMiddleware, routingMiddleware];

const enhancers = [];
const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
);

const store = createStore(rootReducer, initialState, composedEnhancers);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    /*eslint-disable */ // Allow require
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
