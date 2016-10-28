import { FETCH_SPREADS,
         FETCH_SPREADS_SUCCESS,
         FETCH_SPREAD,
         FETCH_SPREAD_SUCCESS } from '../constants/actions';


const defaultState = { list: [], detail: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case FETCH_SPREADS:
      return state;

    case FETCH_SPREADS_SUCCESS:
      return { ...state, list: action.data };

    case FETCH_SPREAD:
      return state;

    case FETCH_SPREAD_SUCCESS:
      return { ...state, object: action.data };

    default:
      return state;

  }

}
