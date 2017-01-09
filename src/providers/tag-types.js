import DataProvider from './base/data-provider';
import { FETCH_TAG_TYPES, CREATE_TAG_TYPE } from '../constants/actions';


export default class TagTypesProvider extends DataProvider {

  get resource() { return 'orderticket/tables/tag_type/'; }

  get actionTypes() {
    return {
      fetchSuccess: FETCH_TAG_TYPES,
      create: CREATE_TAG_TYPE
    };
  }

}
