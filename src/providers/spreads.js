import { FETCH_SPREAD_LIST, FETCH_SPREAD_OBJECT, CREATE_SPREAD } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class SpreadsProvider extends DataProvider {

  get resource() { return 'orderticket/tables/spread/'; }

  get actionTypes() {
    return {
      fetchSuccess: FETCH_SPREAD_LIST,
      fetchObjectSuccess: FETCH_SPREAD_OBJECT,
      create: CREATE_SPREAD
    };
  }

  create(data, packId) {
    if (packId) data.package_id = packId;
    return super.create(data);
  }

  updateMultiplier(data) {
    const { id, multiplier } = data;

    return fetch(this.getObjectUrl(id), {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ multiplier })
    });
  }

}
