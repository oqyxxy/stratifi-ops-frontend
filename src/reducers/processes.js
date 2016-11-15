import { FETCH_PROCESS_LIST } from '../constants/actions';


const defaultState = { list: [], object: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case FETCH_PROCESS_LIST:
      return { ...state, list: action.data };

    default:
      return state;

  }

}
