import { FETCH_SPREADS,
         FETCH_SPREADS_SUCCESS,
         FETCH_SPREAD,
         FETCH_SPREAD_SUCCESS } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class SpreadsProvider extends DataProvider {

  get resource() { return 'spreads'; }

  get actionTypes() {
    return {
      fetch: FETCH_SPREADS,
      fetchSuccess: FETCH_SPREADS_SUCCESS,
      fetchObject: FETCH_SPREAD,
      fetchObjectSuccess: FETCH_SPREAD_SUCCESS
    };
  }

}
