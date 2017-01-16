import React, { Component, PropTypes } from 'react';
import { toDateString, getSpreadStatus, getSpreadPrice } from '../utils/filters';


export default class SpreadListItem extends Component {

  static propTypes = {
    sprd: PropTypes.object.isRequired,
    multiplier: PropTypes.number.isRequired,
    toggleSpread: PropTypes.func.isRequired
  };

  get presentQuantity() {
    const { multiplier, sprd } = this.props;
    const quantity = sprd.orders.reduce((prev, cur) => prev + (cur.quantity || 0), 0);
    if (!quantity) return '-';
    if (multiplier !== 1) {
      return `${quantity} x ${multiplier}`;
    } else {
      return multiplier;
    }
  }

  render() {
    const { sprd, toggleSpread } = this.props;

    return (
      <tr key={sprd.id}>
        <td className="checkbox-cell">
          {
            getSpreadStatus(sprd) !== 'Executed' ? (
              <label className="c-input c-checkbox">
                <input onClick={e => toggleSpread(sprd.id)} type="checkbox"/>
                <span className="c-indicator icon-checkmark"/>
              </label>
            ) : null
          }
        </td>
        <td>{sprd.description}</td>
        <td>{sprd.orders.length}</td>
        <td>{getSpreadPrice(sprd)}</td>
        <td>{this.presentQuantity}</td>
        <td>{toDateString(sprd.creation_date)}</td>
        <td>{getSpreadStatus(sprd)}</td>
      </tr>
    );
  }

}
