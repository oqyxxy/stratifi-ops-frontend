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
      .then(json => this.dispatch({
        type: this.actionTypes.fetchSuccess,
        data: this.getDataFromJSON ? this.getDataFromJSON(json) : json.data.items
      }));
  }

  getObject(id) {
    fetch(`${this.resourceUrl}${id}`, { headers: HEADERS })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.fetchObjectSuccess, data: json }));
  }

  create(data) {
    return fetch(this.resourceUrl, { method: 'POST', headers: HEADERS, body: data })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.create, data: json }));
  }

}
