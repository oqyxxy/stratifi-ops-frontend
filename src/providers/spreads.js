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

  create(data, packId, tagsStore, securitiesStore) {
    const json = {
      package_id: packId,
      description: data.description,
      orders: data.orders.map(order => ({
        ...order,
        tags: [tagsStore.find(o => o.name === order.tags).id],
        security: securitiesStore.find(s => s.name === order.security).id
      })),
    };

    return super.create(json);
  }

}
