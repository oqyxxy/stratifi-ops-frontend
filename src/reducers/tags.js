import { FETCH_TAG_LIST } from '../constants/actions';


const _default_state = { list: [], object: {} };

export default function(state = _default_state, action) {

  switch (action.type) {

    case FETCH_TAG_LIST:
      return { ...state, list: action.data };

    default:
      return state;

  }

}
