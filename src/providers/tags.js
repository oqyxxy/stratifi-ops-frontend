import { FETCH_TAG_LIST } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class TagsProvider extends DataProvider {

  get resource() { return 'orderticket/tables/tag/'; }

  get actionTypes() {
    return { fetchSuccess: FETCH_TAG_LIST };
  }

}
