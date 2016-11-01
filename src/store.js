import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import appReducers from './reducers';



const getStore = browserHistory => {
  return createStore(
    combineReducers({ ...appReducers, routing: routerReducer }),
    compose(applyMiddleware(routerMiddleware(browserHistory), thunk))
  );
}


export default getStore;
