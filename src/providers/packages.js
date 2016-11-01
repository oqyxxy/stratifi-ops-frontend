import { FETCH_PACKAGE_LIST, FETCH_PACKAGE_OBJECT } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class PackagesProvider extends DataProvider {

  get resource() { return 'orderticket/tables/package/'; }

  get actionTypes() {
    return {
      fetchSuccess: FETCH_PACKAGE_LIST,
      fetchObjectSuccess: FETCH_PACKAGE_OBJECT
    };
  }

}
