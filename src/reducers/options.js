import { FETCH_OPTION_LIST } from '../constants/actions';


const defaultState = { list: [], object: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case FETCH_OPTION_LIST:
      return { ...state, list: action.data };

    default:
      return state;

  }

}
