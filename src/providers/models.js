import { GET_MODEL_LIST } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class ModelsProvider extends DataProvider {

  get resource() { return 'finfolio/report/compositebymodel'; }

  get actionTypes() {
    return {
      fetchSuccess: GET_MODEL_LIST
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
    
    //Return the latest task
    let creationDate = tasksBuf.reduce((max, t) => (new Date(t.creation_date) > new Date(max)) ? t.creation_date : max, 0);
    tasksBuf = tasksBuf.filter(t => t.creation_date === creationDate);

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

    return tasksBuf[0];
  }

}
