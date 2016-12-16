import { FETCH_BACKTEST_LIST, FETCH_BACKTEST_OBJECT, RUN_BACKTEST } from '../constants/actions';


const defaultState = {
  list: [],
  object: {},
  runResult: null,
  name: null,
};


export default function backtestsReducer(state = defaultState, action) {

  switch (action.type) {

    case FETCH_BACKTEST_LIST:
      return { ...state, list: action.data };

    case FETCH_BACKTEST_OBJECT:
      return { ...state, object: action.data.object, name: action.data.name };

    case RUN_BACKTEST:
      return { ...state, runResult: action.data };

    default:
      return state;

  }

}
