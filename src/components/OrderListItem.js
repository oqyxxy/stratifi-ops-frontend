import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { TableCellInput } from './form';
import { toDateString } from '../utils/filters';


class OrderListItem extends Component {

  static propTypes = {
    ord: PropTypes.object.isRequired,
    updateMultiplier: PropTypes.func.isRequired,
    undoMultiplier: PropTypes.func.isRequired,
    toggleOrder: PropTypes.func.isRequired
  };

  onUpdateMultiplier(values) {
    const { ord, updateMultiplier } = this.props;
    updateMultiplier(ord.id, values.multiplier);
  }

  render() {
    const { ord, toggleOrder, undoMultiplier, fields, handleSubmit } = this.props;

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
        <TableCellInput type="number" {...fields.multiplier} onBlur={handleSubmit(this.onUpdateMultiplier.bind(this))} />
        <td>{toDateString(ord.creation_date)}</td>
        <td>{ord.status}</td>
        {
          (ord.multiplier !== ord.prev_multiplier) ? (
            <td className="action">
              <button className="btn btn-primary btn-black"
                      onClick={e => undoMultiplier(ord)}>Undo</button>
            </td>
          ) : null
        }
      </tr>
    );
  }

}


export default reduxForm({
  fields: ['multiplier']
}, (state, ownProps) => ({
  initialValues: {multiplier: ownProps.ord.multiplier}
}))(OrderListItem);
