import { RESET_MODEL_LIST, APPEND_TO_MODEL_LIST } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class ModelsProvider extends DataProvider {

  get resource() { return 'finfolio/report/compositebymodel'; }

  get actionTypes() {
    return {
      fetchSuccess: RESET_MODEL_LIST
    };
  }

  _getTaskDateRange(task) {
    const minDate = new Date(task.min_date);
    const maxDate = new Date(task.max_date);
    return maxDate - minDate;
  }

  _findBestMatchedID(tasks) {
    let tasksBuf = tasks;

    let maxDateRange = tasksBuf.reduce((maxRange, t) => {
      const tDateRange = this._getTaskDateRange(t);
      return (tDateRange > maxRange) ? tDateRange : maxRange;
    }, 0);
    tasksBuf = tasksBuf.filter(t => this._getTaskDateRange(t) === maxDateRange);

    if (tasksBuf.length === 1) return tasksBuf[0];

    let maxNumAccounts = tasksBuf.reduce((max, t) => (t.num_accounts > max) ? t.num_accounts : max, 0);
    tasksBuf = tasksBuf.filter(t => t.num_accounts === maxNumAccounts);

    return tasksBuf[0].id;
  }

  _getObjectForList(id) {
    fetch(this.getObjectUrl(id), { headers: this.headers })
      .then(response => response.json())
      .then(json => {
        const data = json.data;
        const metrics = JSON.parse(data.json.replace(/\bNaN\b/g, "null"));

        var result={};
        for(var key in data) result[key]=data[key];
        for(var key in metrics) result[key]=metrics[key];

        this.dispatch({ type: APPEND_TO_MODEL_LIST, data: result })
      });
  }

  getList() {
    super.getList().then(tasks => {
      tasks
        .reduce((list, t) => (!list.includes(t.model)) ? list.concat(t.model) : list, [])
        .map(model => tasks.filter(t => t.model === model))
        .map(tasksGroup => this._findBestMatchedID(tasksGroup))
        .map(id => this._getObjectForList(id));
    });
  }

}
