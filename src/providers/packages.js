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

  create(data, spreadsStore, tagsStore, securitiesStore) {
    const json = {
      description: data.description,
      orders: data.orders.map(order => ({
        ...order,
        tags: [tagsStore.find(o => o.name === order.tags).id],
        security: securitiesStore.find(s => s.name === order.security).id
      })),
      spreads: data.spreads.map(sprd => spreadsStore.find(s => s.description === sprd.description).id)
    };

    console.log(json);
    return super.create(json);
  }

  getDataFromJSON(json) { return json; }

}
