import { FETCH_PACKAGE_LIST, FETCH_PACKAGE_OBJECT, CREATE_PACKAGE } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class PackagesProvider extends DataProvider {

  get resource() { return 'orderticket/tables/package/'; }

  get actionTypes() {
    return {
      fetchSuccess: FETCH_PACKAGE_LIST,
      fetchObjectSuccess: FETCH_PACKAGE_OBJECT,
      create: CREATE_PACKAGE,
    };
  }

  create(data, spreadsStore) {
    const json = {
      ...data,
      spreads: data.spreads.map(sprd => spreadsStore.find(s => s.description === sprd.description).id)
    };

    return super.create(json);
  }

  getDataFromJSON(json) { return json; }

  updateMultiplier(id, multiplier) {
    return fetch(this.getObjectUrl(id), {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ multiplier })
    });
  }

}
