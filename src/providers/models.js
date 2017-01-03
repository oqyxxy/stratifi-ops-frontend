import { GET_MODEL_LIST, GET_MODEL_OBJECT, GET_MODEL_BASIS_OBJECT, CLEAR_MODEL_OBJECT,GET_MODEL_VIX_OBJECT } from '../constants/actions';
import moment from 'moment';
import DataProvider from './base/data-provider';
import {queryParams} from '../utils/query-params';
import {analyzeProxies} from '../utils/timeseries';

export default class ModelsProvider extends DataProvider {

  get resource() { return 'finfolio/report/compositebymodel'; }

  get actionTypes() {
    return {
      fetchSuccess: GET_MODEL_LIST,
      fetchObjectSuccess: GET_MODEL_OBJECT,
      fetchBasisObjectSuccess: GET_MODEL_BASIS_OBJECT,
      fetchVIXObjectSuccess: GET_MODEL_VIX_OBJECT,
      clearObject: CLEAR_MODEL_OBJECT,
    };
  }

  getDataFromJSON(json) {
    const tasks = super.getDataFromJSON(json);
    return tasks
      .reduce((list, t) => (!list.includes(t.model)) ? list.concat(t.model) : list, [])
      .map(model => tasks.filter(t => t.model === model))
      .map(tasksGroup => this._findBestMatchedTask(tasksGroup))
      .map(task => ({ ...task, ...JSON.parse(task.json.replace(/\bNaN\b/g, "null")).strategy.metrics }))
  }

  _getTaskDateRange(task) {
    const minDate = new Date(task.min_date);
    const maxDate = new Date(task.max_date);
    return maxDate - minDate;
  }

  _findBestMatchedTask(tasks) {
    let tasksBuf = tasks;

    tasksBuf = tasksBuf.filter(t => t.status_code === 200);
    
    //Return the latest task
    let creationDate = tasksBuf.reduce((max, t) => (new Date(t.creation_date) > new Date(max)) ? t.creation_date : max, 0);
    tasksBuf = tasksBuf.filter(t => t.creation_date === creationDate);
    /*
    let maxDateRange = tasksBuf.reduce((maxRange, t) => {
      const tDateRange = this._getTaskDateRange(t);
      return (tDateRange > maxRange) ? tDateRange : maxRange;
    }, 0);
    tasksBuf = tasksBuf.filter(t => this._getTaskDateRange(t) === maxDateRange);

    if (tasksBuf.length === 1) return tasksBuf[0];

    let maxNumAccounts = tasksBuf.reduce((max, t) => (t.num_accounts > max) ? t.num_accounts : max, 0);
    tasksBuf = tasksBuf.filter(t => t.num_accounts === maxNumAccounts);

    if (tasksBuf.length === 1) return tasksBuf[0];

    let creationDate = tasksBuf.reduce((max, t) => (new Date(t.creation_date) > new Date(max)) ? t.creation_date : max, 0);
    tasksBuf = tasksBuf.filter(t => t.creation_date === creationDate);
    */
    return tasksBuf[0];
  }

  getBasisObject(query) {
    let url = `https://robo-pm-production.stratifi.com/api/ivolatility/basis_timeseries`;
    let queryString = '';

    if (Object.keys(query).length) {
      queryString = queryParams(query);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;

    return fetch(url, { headers: this.headers })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.fetchBasisObjectSuccess, data: json }));
  }
  
  
  getVIXObject(query) {
    let url = `https://robo-pm-production.stratifi.com/api/ivolatility/ticker_timeseries`;
    let queryString = '';

    if (Object.keys(query).length) {
      queryString = queryParams(query);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;

    return fetch(url, { headers: this.headers })
      .then(response => response.json())
      .then(json => this.dispatch({ type: this.actionTypes.fetchVIXObjectSuccess, data: json }));
  }

  clearObject() {
    this.dispatch({type: this.actionTypes.clearObject});
  }

  static prepareData(model, startDate, endDate) {
    let result = Object.assign({}, {
      strategyName: '',
      metrics: [],
      returns: [],
      returnsCumulative: [],
    });

    const tic = {"benchmark": {"metrics": {"returns_inception": -0.0043380600000000324, "returns_mtd": 0.0016718509048068153, "returns_daily": -0.0006088318560709287, "max_drawdown": -0.008696823646969148, "returns_ytd": -0.0043380600000000324, "annualized_volatility": 0.01731311269467186, "returns_qtd": -0.004338059999999921, "returns_wtd": -0.00020637284403290934, "annualized_return": -0.03265402486892255}, "returns": [["09/14/2016", 0.00104364], ["09/15/2016", -0.0025999865500369195], ["09/16/2016", 0.00012900112048690632], ["09/19/2016", 0.00013857820286042316], ["09/20/2016", -0.0007464242906125566], ["09/21/2016", -0.0022099424040574827], ["09/22/2016", 7.752893822853727e-06], ["09/23/2016", 0.00041863293560024317], ["09/26/2016", 0.001376154432855529], ["09/27/2016", -0.001162124066227278], ["09/28/2016", -0.0009948279265031678], ["09/29/2016", 0.00036566124458357126], ["09/30/2016", -0.0017735489223694848], ["10/03/2016", 0.00018798790487067546], ["10/04/2016", 0.0009258017038203417], ["10/05/2016", -0.0013278566715512316], ["10/06/2016", -0.0014573559515889355], ["10/07/2016", 0.0017761291634438895], ["10/10/2016", -0.0015499643868919217], ["10/11/2016", 0.0023021089799921705], ["10/12/2016", 0.00044238072924005547], ["10/13/2016", 0.00037482749153980614], ["10/14/2016", -0.0003482522575683098], ["10/17/2016", -0.00020112309838803724], ["10/18/2016", -0.00016687591307684314], ["10/19/2016", 0.00014599807868699422], ["10/20/2016", 0.00026707135775657487], ["10/21/2016", 0.0005142282714995873], ["10/24/2016", -0.0005198884598558929], ["10/25/2016", 0.0003198071929934335], ["10/26/2016", 8.516894847804897e-06], ["10/27/2016", 0.0005945505273138308], ["10/28/2016", -0.0006088318560709287]]}};

    if (model && model.data) {
      const modelItem = model.data.items[0];
      const data = Object.assign(JSON.parse(modelItem.json), tic);
      const startDateUnix = moment(startDate).unix();
      const endDateUnix = moment(endDate).unix();
      const benchmarkReturns = data.benchmark.returns
        .filter(item => {
          const date = moment(item[0]).unix();
          return date >= startDateUnix && date <= endDateUnix;
        })
        .map(item => ([moment(item[0]).unix(), item[1]]));
      const strategyReturns = data.strategy.returns
        .filter(item => {
          const date = moment(item[0]).unix();
          return date >= startDateUnix && date <= endDateUnix;
        })
        .map(item => ([moment(item[0]).unix(), item[1]]));

      const preparedData = analyzeProxies([benchmarkReturns, strategyReturns], startDateUnix, endDateUnix);

      result.strategyName = modelItem.model;
      result.metrics = [data.benchmark.metrics, data.strategy.metrics];
      result.returns = preparedData.returns;
      result.returnsCumulative = preparedData.returnsCumulative;

    }

    return result;
  }

}
