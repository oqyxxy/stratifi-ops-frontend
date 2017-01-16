import { API_BASE_URL, HEADERS } from '../../config';
import Provider from './provider';
import normalizeErrors from '../../utils/errors-normalizer';


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
    return fetch(`${this.resourceUrl}/${id}`, { headers: this.headers })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.fetchObjectSuccess, data: json }));
  }

  _create(data, url, actionType) {
    return fetch(url, { method: 'POST', headers: this.headers, body: JSON.stringify(data) })
      .then(response => Promise.all([response, response.json()]))
      .then(([response, json]) => {
        if (response.status === 201) {
          return Promise.resolve(json);
        } else if (response.status === 400) {
          normalizeErrors(json);
          return Promise.reject(json);
        } else {
          throw new Error('Unexpected status code');
        }
      })
      .then(json => {
        this.dispatch({ type: actionType, data: json });
        return json;
      });
  }

  create(data) {
    return this._create(data, this.resourceUrl, this.actionTypes.create);
  }

  bulkCreate(data) {
    return this._create(data, `${this.resourceUrl}bulk`, this.actionTypes.bulkCreate);
  }

}
