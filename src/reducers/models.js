import { RESET_MODEL_LIST, APPEND_TO_MODEL_LIST } from '../constants/actions';


const defaultState = { list: [], object: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case RESET_MODEL_LIST:
      return { ...state, list: [] };

    case APPEND_TO_MODEL_LIST:
      return { ...state, list: state.list.concat(action.data) };

    default:
      return state;

  }

}
