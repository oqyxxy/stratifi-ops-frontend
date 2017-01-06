import { FETCH_TAG_TYPES } from '../constants/actions';


const _default_state = [];

export default function(state = _default_state, action) {

  switch (action.type) {

    case FETCH_TAG_TYPES:
      return action.data;

    default:
      return state;

  }

}
