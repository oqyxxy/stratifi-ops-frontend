import { API_BASE_URL, HEADERS } from '../../config';
import Provider from './provider';


export default class DataProvider extends Provider {

  constructor(dispatch) {
    super(dispatch);
    this.headers = HEADERS;
    this.resourceUrl = `${API_BASE_URL}${this.resource}`;
  }

  getObjectUrl(id) {
    return `${this.resourceUrl}${id}`;
  }

  getDataFromJSON(json) {
    return json.data.items;
  }

  getList() {
    return fetch(this.resourceUrl, { headers: this.headers })
      .then(response => response.json())
      .then(json => {
        const data = this.getDataFromJSON(json);

        this.dispatch({
          type: this.actionTypes.fetchSuccess,
          data: data
        });
        return data;
      });
  }

  getObject(id) {
    fetch(`${this.resourceUrl}/${id}`, { headers: this.headers })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.fetchObjectSuccess, data: json }));
  }

  create(data) {
    return fetch(this.resourceUrl, { method: 'POST', headers: this.headers, body: JSON.stringify(data) })
      .then(response => response.json())
      .then(json => {
        this.dispatch({ type: this.actionTypes.create, data: json })
        return json;
      });
  }

}
