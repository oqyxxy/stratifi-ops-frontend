import { FETCH_SECURITY_LIST } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class SecuritiesProvider extends DataProvider {

  get resource() { return 'orderticket/tables/security/'; }

  get actionTypes() {
    return { fetchSuccess: FETCH_SECURITY_LIST };
  }

}
