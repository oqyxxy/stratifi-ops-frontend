import { FETCH_PACKAGES,
         FETCH_PACKAGES_SUCCESS,
         FETCH_PACKAGE,
         FETCH_PACKAGE_SUCCESS } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class PackagesProvider extends DataProvider {

  get resource() { return 'orderticket/tables/package/'; }

  get actionTypes() {
    return {
      fetch: FETCH_PACKAGES,
      fetchSuccess: FETCH_PACKAGES_SUCCESS,
      fetchObject: FETCH_PACKAGE,
      fetchObjectSuccess: FETCH_PACKAGE_SUCCESS
    };
  }

}
