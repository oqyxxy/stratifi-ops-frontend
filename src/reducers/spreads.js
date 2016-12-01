import { FETCH_SPREAD_LIST, FETCH_SPREAD_OBJECT } from '../constants/actions';


const defaultState = { list: [], detail: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case FETCH_SPREAD_LIST:
      return { ...state, list: action.data };

    case FETCH_SPREAD_OBJECT:
      return { ...state, object: action.data };

    default:
      return state;

  }

}
