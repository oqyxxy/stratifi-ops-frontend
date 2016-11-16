/** import stylesheets: **/
import './styles/dist/css/stratifi.min.css';
import './styles/dist/css/app.min.css';

/** import vendor js: **/
import './vendor';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './containers/App';
import PackagesList from './containers/PackagesList';
import PackagesDetail from './containers/PackagesDetail';
import Performance from './containers/Performance';
import Dashboard from './containers/Dashboard';

import getStore from './store';


const store = getStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="packages">
          <IndexRoute component={PackagesList} />
          <Route path=":id" component={PackagesDetail} />
        </Route>
        <Route path="performance" component={Performance} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
