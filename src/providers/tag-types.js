import DataProvider from './base/data-provider';
import { FETCH_TAG_TYPES } from '../constants/actions';


export default class TagTypesProvider extends DataProvider {

  get resource() { return 'orderticket/tables/tag_type/'; }

  get actionTypes() {
    return { fetchSuccess: FETCH_TAG_TYPES };
  }

}
