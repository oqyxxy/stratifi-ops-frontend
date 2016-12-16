import Provider from './base/provider';
import { BACKTESTER_BASE_URL } from '../config';
import { FETCH_BACKTEST_LIST, FETCH_BACKTEST_OBJECT, RUN_BACKTEST } from '../constants/actions';


const _collectDataFromInputs = inputs => {
  const data = {};
  for (let key in inputs) {
    if (!inputs.hasOwnProperty(key)) continue;
    const val = inputs[key];
    if (val && val.value)
      data[key] = val.value;
    else if (val && typeof val === 'object' && !val.tagName) {
      data[key] = {};
      for (let k in inputs[key]) {
        if (!inputs[key].hasOwnProperty(k)) continue;
        if (inputs[key][k] && inputs[key][k].value) data[key][k] = inputs[key][k].value;
      }
    }
  }
  return data;
};


export default class BacktestsProvider extends Provider {

  getImageURL(imageUrl) {
    return `${BACKTESTER_BASE_URL}${imageUrl}`;
  }

  getSavedList() {
    return fetch(`${BACKTESTER_BASE_URL}/saved`)
      .then(response => response.json())
      .then(json => this.dispatch({ type: FETCH_BACKTEST_LIST, data: json }));
  }

  getSavedObject(filename) {
    return fetch(`${BACKTESTER_BASE_URL}/report`, {
      method: "post",
      body: JSON.stringify({
        load_previous_backtest: true,
        previous_backtest_filename: filename
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => this.dispatch({
        type: FETCH_BACKTEST_OBJECT,
        data: {
          object: json,
          name: filename
        }
      }));
  }

  runBacktest(inputs) {
    return fetch(`${BACKTESTER_BASE_URL}/report`, {
      method: "post",
      body: JSON.stringify(_collectDataFromInputs(inputs)),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(json => this.dispatch({ type: RUN_BACKTEST, data: json }));
  }

  skipBacktestResult() {
    this.dispatch({ type: RUN_BACKTEST, data: null });
  }

}
