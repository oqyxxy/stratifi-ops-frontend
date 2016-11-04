/** import stylesheets: **/
import './styles/dist/css/stratifi.min.css';
import './styles/dist/css/app.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './containers/App';
import PackagesList from './containers/PackagesList';
import PackagesDetail from './containers/PackagesDetail';

import getStore from './store';


const store = getStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/packages" />
        <Route path="packages">
          <IndexRoute component={PackagesList} />
          <Route path=":id" component={PackagesDetail} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
