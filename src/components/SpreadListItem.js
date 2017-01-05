import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { TableCellInput } from './form';
import { toDateString, getSpreadStatus, getSpreadPrice } from '../utils/filters';


class SpreadListItem extends Component {

  static propTypes = {
    sprd: PropTypes.object.isRequired,
    updateMultiplier: PropTypes.func.isRequired,
    undoMultiplier: PropTypes.func.isRequired,
    toggleSpread: PropTypes.func.isRequired
  };

  onUpdateMultiplier(values) {
    const { sprd, updateMultiplier } = this.props;
    updateMultiplier(sprd.id, values.multiplier);
  }

  render() {
    const { sprd, fields, handleSubmit, toggleSpread, undoMultiplier } = this.props;

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
        <TableCellInput type="number" {...fields.multiplier} onBlur={handleSubmit(this.onUpdateMultiplier.bind(this))} />
        <td>{toDateString(sprd.creation_date)}</td>
        <td>{getSpreadStatus(sprd)}</td>
        {
          (sprd.multiplier !== sprd.prev_multiplier) ? (
            <td className="action">
              <button className="btn btn-primary btn-black"
                      onClick={e => undoMultiplier(sprd)}>Undo</button>
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
  initialValues: {multiplier: ownProps.sprd.multiplier}
}))(SpreadListItem);
