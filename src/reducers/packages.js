import { FETCH_PACKAGES,
         FETCH_PACKAGES_SUCCESS,
         FETCH_PACKAGE,
         FETCH_PACKAGE_SUCCESS } from '../constants/actions';


const defaultState = { list: [], object: {} }

export default function(state = defaultState, action) {

  switch (action.type) {

    case FETCH_PACKAGES:
      return state;

    case FETCH_PACKAGES_SUCCESS:
      return { ...state, list: action.data };

    case FETCH_PACKAGE:
      return state;

    case FETCH_PACKAGE_SUCCESS:
      return { ...state, object: action.data };

    default:
      return state;

  }

}
