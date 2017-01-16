import DataProvider from './base/data-provider';
import { BULK_CREATE_ORDERS } from '../constants/actions';


export default class OrdersProvider extends DataProvider {

  get resource() { return 'orderticket/tables/order/'; }
  get actionTypes() {
    return {bulkCreate: BULK_CREATE_ORDERS};
  }

  execute(data, multiplier) {
    const promises = [];
    for (let order of data.orders) {
      let prms = fetch(this.getObjectUrl(order.id), {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify({
          status: 'Executed',
          quantity: Number.parseInt(order.quantity, 10) * (multiplier || 1),
          executed_price: Number.parseInt(order.executed_price, 10)
        })
      });
      promises.push(prms);
    }

    return Promise.all(promises);
  }

  bulkCreate(data, packId) {
    for (let order of data.orders) order.package_id = packId;
    return super.bulkCreate(data);
  }

}
