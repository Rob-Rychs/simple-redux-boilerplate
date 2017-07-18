import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import HomePageContainer from '../containers/HomePageContainer';
import PostsByCategoryContainer from '../containers/PostsByCategoryContainer';
import SinglePostContainer from '../containers/SinglePostContainer';
import NewPostContainer from '../containers/NewPostContainer';
import EditPostContainer from '../containers/EditPostFormContainer';

const FourOhFour = () => <h2>404</h2>;

const SampleComponent = () => (
  <h1>
    My Awesome Redux Boilerplate
    {' '}
    <span role="img" aria-label="emoji-with-sunglasses">😎</span>
  </h1>
);

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={SampleComponent} />
          <Route exact path="/posts" component={HomePageContainer} />
          <Route
            exact
            path="/:category/posts"
            component={PostsByCategoryContainer}
          />
          <Route exact path="/posts/:postId" component={SinglePostContainer} />
          <Route
            exact
            path="/posts/:postId/edit"
            component={EditPostContainer}
          />
          <Route exact path="/newpost" component={NewPostContainer} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
