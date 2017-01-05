import DataProvider from './base/data-provider';


export default class OrdersProvider extends DataProvider {

  get resource() { return 'orderticket/tables/order/'; }

  execute(data) {
    const promises = [];
    for (let order of data.orders) {
      let prms = fetch(this.getObjectUrl(order.id), {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify({
          status: 'Executed',
          quantity: Number.parseInt(order.quantity, 10) * (Number.parseInt(order.multiplier, 10) || 1),
          executed_price: Number.parseInt(order.executed_price, 10)
        })
      });
      promises.push(prms);
    }

    return Promise.all(promises);
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
