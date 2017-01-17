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
import { IntlProvider } from 'react-intl';
import { INTL_CONFIG } from './config';
import App from './containers/App';
import PackagesList from './containers/PackagesList';
import CreatePackage from './containers/CreatePackage';
import PackagesDetail from './containers/PackagesDetail';
import Performance from './containers/Performance';
import Dashboard from './containers/Dashboard';
import Research from './containers/Research';
import StrategyDetail from './containers/StrategyDetail';
import SpreadDetail from './containers/SpreadDetail';

import getStore from './store';

const store = getStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider {...INTL_CONFIG} >
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
          <Route path="packages">
            <IndexRoute component={PackagesList} />
            <Route path="create" component={CreatePackage} />
            <Route path=":id" component={PackagesDetail} />
          </Route>
          <Route path="spreads">
            <Route path=":id" component={SpreadDetail} />
          </Route>
          <Route path="performance" component={Performance} />
          <Route path="research" component={Research} />
          <Route path="strategy">
            <Route path=":id" component={StrategyDetail} />
          </Route>
        </Route>
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);