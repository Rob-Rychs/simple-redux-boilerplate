import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
// import HomePage from './HomePage';

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
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
