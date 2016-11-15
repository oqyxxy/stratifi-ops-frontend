import { FETCH_PROCESS_LIST } from '../constants/actions';
import DataProvider from './base/data-provider';


export default class ProcessesProvider extends DataProvider {

  get resource() { return 'finfolio/report/compositebymodel'; }

  get actionTypes() {
    return {
      fetchSuccess: FETCH_PROCESS_LIST
    };
  }

  // TODO: remove! mocks the data until the endpoint is ready
  getList() {
    this.dispatch({
      type: FETCH_PROCESS_LIST,
      data: [
        {
          id: 1,
          status: 'Done'
        },
        {
          id: 2,
          status: 'Active'
        },
        {
          id: 3,
          status: 'Pending'
        },
        {
          id: 4,
          status: 'Pending'
        }
      ]
    })
  }

}
