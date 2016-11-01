import { FETCH_SPREAD_LIST, FETCH_SPREAD_OBJECT } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class SpreadsProvider extends DataProvider {

  get resource() { return 'orderticket/tables/spread/'; }

  get actionTypes() {
    return {
      fetchSuccess: FETCH_SPREAD_LIST,
      fetchObjectSuccess: FETCH_SPREAD_OBJECT
    };
  }

}
