import React, { Component, PropTypes } from 'react';
import { toDateString } from '../utils/filters';


export default class OrderListItem extends Component {

  static propTypes = {
    ord: PropTypes.object.isRequired,
    multiplier: PropTypes.number.isRequired,
    toggleOrder: PropTypes.func.isRequired
  };

  get presentQuantity() {
    const { multiplier, ord } = this.props;
    if (!ord.quantity) return '-';
    if (!multiplier || multiplier === 1 || ord.status === 'Executed') {
      return ord.quantity;
    } else {
      return `${ord.quantity} x ${multiplier}`;
    }
  }

  render() {
    const { ord, toggleOrder } = this.props;

    return (
      <tr>
        <td className="checkbox-cell">
          {
            ord.status !== 'Executed' && (
              <label className="c-input c-checkbox">
                <input onClick={e => toggleOrder(ord)} type="checkbox" />
                <span className="c-indicator icon-checkmark" />
              </label>
            )
          }
        </td>
        <td>{ord.description}</td>
        <td>{ord.security}</td>
        <td>{ord.target_price}</td>
        <td>{this.presentQuantity}</td>
        <td>{toDateString(ord.creation_date)}</td>
        <td>{ord.status}</td>
      </tr>
    );
  }

}
