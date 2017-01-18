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

  getObjectDataFromJSON(json) {
    return this.getDataFromJSON(json)[0];
  }

  splitOrders({orders}) {
    const spreadOrders = [];
    const packageOrders = [];

    const def = orders[0].quantity / orders[0].ratio;
    const basisQuantityPerRatio = orders
      .map(ord => ord.quantity / ord.ratio)
      .reduce((min, coef) => coef < min ? coef : min, def);

    for (let order of orders) {
      const expectedQuantity = order.ratio * basisQuantityPerRatio;
      const diff = order.quantity - expectedQuantity;

      if (diff) {
        spreadOrders.push(Object.assign({}, order, {quantity: expectedQuantity}));
        const packOrder = Object.assign({}, order, {quantity: diff});
        delete packOrder.ratio;
        packageOrders.push(packOrder);
      } else {
        spreadOrders.push(order);
      }
    }

    return [spreadOrders, packageOrders];
  }

  create(data, packId) {
    if (packId) data.package_id = packId;
    return super.create(data);
  }

}
