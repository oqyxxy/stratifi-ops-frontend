/** import stylesheets: **/
import './styles/dist/css/stratifi.min.css';
import './styles/dist/css/app.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { useRouterHistory, Router, Route, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';
import App from './containers/App';
import PackagesList from './containers/PackagesList';

import getStore from './store';


const browserHistory = useRouterHistory(createHistory)({ basename: '/' });
const store = getStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/packages" />
        <Route path="packages" component={PackagesList} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
