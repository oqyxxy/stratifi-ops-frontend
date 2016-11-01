import { FETCH_PACKAGE_LIST, FETCH_PACKAGE_OBJECT } from '../constants/actions';


const defaultState = { list: [], object: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case FETCH_PACKAGE_LIST:
      return { ...state, list: action.data };

    case FETCH_PACKAGE_OBJECT:
      return { ...state, object: action.data };

    default:
      return state;

  }

}
