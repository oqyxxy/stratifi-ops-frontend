import { GET_MODEL_LIST } from '../constants/actions';


const defaultState = { list: [], object: {} };

export default function(state = defaultState, action) {

  switch (action.type) {

    case GET_MODEL_LIST:
      return { ...state, list: action.data };

    default:
      return state;

  }

}
