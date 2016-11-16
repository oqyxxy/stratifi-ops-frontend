import { FETCH_OPTION_LIST } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class OptionsProvider extends DataProvider {

  get resource() { return ''; }  // TODO: add resource url

  get actionTypes() {
    return {
      fetchSuccess: FETCH_OPTION_LIST
    };
  }

  getList() {
    return this.dispatch({
      type: FETCH_OPTION_LIST,
      data: [
        {
          options: 12,
          date: '2016-06-02',
        },
        {
          options: 14,
          date: '2016-06-03',
        },
        {
          options: 16,
          date: '2016-06-04',
        },
        {
          options: 18,
          date: '2016-06-05',
        },
        {
          options: 14,
          date: '2016-06-06',
        },
        {
          options: 15,
          date: '2016-06-07',
        }
      ]
    });
  }

}
