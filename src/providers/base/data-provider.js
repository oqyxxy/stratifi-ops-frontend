import { API_BASE_URL } from '../../config';
import Provider from './provider';


export default class DataProvider extends Provider {

  constructor(dispatch) {
    super(dispatch);
    this.resourceUrl = `${API_BASE_URL}${this.resource}`;
  }

  // TEMPORATY SOLUTION JUST TO ESTABLISH DATA FLOW
  getList(data) {
    this.dispatch({ type: this.actionTypes.fetch });

    setTimeout(() => this.dispatch({ type: this.actionTypes.fetchSuccess, data }), 100);
  }

  // TEMPORATY SOLUTION JUST TO ESTABLISH DATA FLOW
  getObject(data) {
    this.dispatch({ type: this.actionTypes.fetchObject });

    setTimeout(() => this.dispatch({ type: this.actionTypes.fetchObjectSuccess, data }), 100);
  }

}
