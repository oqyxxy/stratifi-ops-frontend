import { GET_MODEL_LIST, GET_MODEL_OBJECT } from '../constants/actions';


const defaultState = { list: [], object: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case GET_MODEL_LIST:
      return { ...state, list: action.data };

    case GET_MODEL_OBJECT:
      return { ...state, object: action.data };

    default:
      return state;

  }

}
