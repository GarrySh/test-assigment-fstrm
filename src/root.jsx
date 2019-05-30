import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import App from './components/App';
import PageNotFound from './components/PageNotFound';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <Router>
        <Switch>
          <Route path="/" exact component={App} />
          <Route component={PageNotFound} />
        </Switch>
      </Router> */}
      <App />
    </Provider>,
    document.getElementById('root')
  );
};
