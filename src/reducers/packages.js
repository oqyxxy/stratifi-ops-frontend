import { FETCH_PACKAGES } from '../constants/actions';


// TEMP
const defaultState = [
  {id: 1, name: 'Package Name 1', totalOrders: 20, totalSpreads: 500, creationDate: '10/16/2016', description: 'Duis ollis est no comodo'},
  {id: 2, name: 'Package Name 2', totalOrders: 50, totalSpreads: 100, creationDate: '10/16/2016', description: 'Duis ollis est no comodo'}
]


export default function(state = defaultState, action) {

  switch (action.type) {

    case FETCH_PACKAGES:
      return action.packages;

    default:
      return state;

  }

}
