import { FETCH_SPREAD_LIST, FETCH_SPREAD_OBJECT, CREATE_SPREAD } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class SpreadsProvider extends DataProvider {

  get resource() { return 'orderticket/tables/spread/'; }

  get actionTypes() {
    return {
      fetchSuccess: FETCH_SPREAD_LIST,
      fetchObjectSuccess: FETCH_SPREAD_OBJECT,
      create: CREATE_SPREAD,
    };
  }

  create(data, packId, tagsStore, securitiesStore) {
    const json = {
      package_id: Number.parseInt(packId),
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
