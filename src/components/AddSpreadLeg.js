import React, { Component, PropTypes } from 'react';
import { spreadLegBuySell, spreadLegCallPut } from '../constants/enums';
import { TableCellSelect, TableCellInput } from './form';


export default class AddSpreadLeg extends Component {

  static propTypes = {
    legs: PropTypes.array.isRequired
  };

  render() {
    return (
      <table className="table table-bordered table-borderless-top editable-fields">
        <thead className="thead-graphite">
        <tr>
          <th>Call/Put</th>
          <th>Buy/Sell</th>
          <th>Strike price</th>
          <th>Ratio</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.legs.map((leg, index) => (
            <tr key={index}>
              <TableCellSelect fieldData={leg.call_put} optionsData={spreadLegCallPut} defaultOption="Call/Put" />
              <TableCellSelect fieldData={leg.buy_sell} optionsData={spreadLegBuySell} defaultOption="Buy/Sell" />
              <TableCellInput type="number" placeholder="Strike price" className="form-control" {...leg.strike_price} />
              <TableCellInput type="number" placeholder="Ratio" className="form-control" {...leg.ratio} />
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }

}
