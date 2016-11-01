import 'whatwg-fetch';
import { API_BASE_URL, HEADERS } from '../../config';
import Provider from './provider';


export default class DataProvider extends Provider {

  constructor(dispatch) {
    super(dispatch);
    this.resourceUrl = `${API_BASE_URL}${this.resource}`;
  }

  getList() {
    fetch(this.resourceUrl, { headers: HEADERS })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.fetchSuccess, data: json.data.items }));
  }

  getObject(id) {
    fetch(`${this.resourceUrl}${id}`, { headers: HEADERS })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.fetchObjectSuccess, data: json }))
      .catch(error => this.dispatch({ // TODO: remove. this is just a data mock until api is finished
        type: this.actionTypes.fetchObjectSuccess,
        data: {
          id: 1,
          name: 'Package Name 1',
          totalOrders: 20,
          totalSpreads: 500,
          creationDate: '10/16/2016',
          description: 'Duis ollis est no comodo',
          spreads: [
            {
              name: 'Spread1',
              orders: [1, 2, 3],
              creation_date: '10/10/2016'
            },
            {
              name: 'Spread2',
              orders: [3, 4, 5],
              creation_date: '10/10/2016'
            },
            {
              name: 'Spread3',
              orders: [6, 7, 8],
              creation_date: '10/10/2016'
            }
          ],
          orders: [
            {
              id: 1,
              name: 'Order1',
              security: 'Security Name',
              target_price: 218.0,
              creation_date: '2016-10-28T12:32:02.359879+00:00',
              status: 'Open'
            },
            {
              id: 2,
              name: 'Order2',
              security: 'Security Name',
              target_price: 286.2,
              creation_date: '2016-10-28T12:32:02.359879+00:00',
              status: 'In Progress'
            },
            {
              id: 3,
              name: 'Order3',
              security: 'Security Name',
              target_price: 718.9,
              creation_date: '2016-10-28T12:32:02.359879+00:00',
              status: 'Open'
            }
          ]
        }
      }));
  }

}
