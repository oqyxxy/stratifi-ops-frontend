import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import appReducers from './reducers';



const getStore = browserHistory => {
  return createStore(
    combineReducers({ ...appReducers, routing: routerReducer }),
    compose(applyMiddleware(routerMiddleware(browserHistory)))
  );
}


export default getStore;
