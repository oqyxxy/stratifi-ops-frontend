import React, { Component, PropTypes } from 'react';
import { DateField, DatePicker } from 'react-date-picker';
import { orderTypes, securityOptionTypes, orderKinds } from '../constants/enums';
import { TableCellSelect, TableCellInput } from './form';


export default class AddSpreadLeg extends Component {

  static propTypes = {
    orders: PropTypes.array.isRequired
  };

  render() {

    return (
      <table className="table table-bordered table-borderless-top editable-fields">
        <thead className="thead-graphite">
        <tr>
          <th>Option name</th>
          <th>Order type</th>
          <th>Order kind</th>
          <th>Target price</th>
          <th>Quantity</th>
          <th>Option type</th>
          <th>Security name</th>
          <th>Strike price</th>
          <th>Expiration date</th>
          <th>Ratio</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.orders.map((order, index) => (
            <tr key={index}>
              <TableCellInput type="text"
                              placeholder="Option name"
                              className="form-control"
                              {...order.description} />
              <TableCellSelect fieldData={order.type}
                               optionsData={orderTypes}
                               defaultOption={'order type'} />
              <TableCellSelect fieldData={order.order_kind}
                               optionsData={orderKinds}
                               defaultOption={'order kind'} />
              <TableCellInput type="number"
                              placeholder="Target price"
                              className="form-control"
                              {...order.target_price} />
              <TableCellInput type="number"
                              placeholder="Quantity"
                              className="form-control"
                              {...order.quantity} />
              <TableCellSelect fieldData={order.security.option_type}
                               optionsData={securityOptionTypes}
                               defaultOption={'option type'} />
              <TableCellInput type="text"
                              placeholder="Security name"
                              className="form-control"
                              {...order.security.name} />
              <TableCellInput type="number"
                              placeholder="Strike price"
                              className="form-control"
                              {...order.security.strike_price} />
              <td>
                <DateField
                  {...order.security.expiration_date}
                  placeholder="YYYY-MM-DD"
                  dateFormat="YYYY-MM-DD"
                  forceValidDate
                  updateOnDateClick={true}
                  collapseOnDateClick={true}>

                  <DatePicker
                    navigation={true}
                    locale="en"
                    highlightWeekends={false}
                    highlightToday={true}
                    weekNumbers={false}
                    footer={false}
                  />
                </DateField>
              </td>
              <TableCellInput type="number" placeholder="Ratio" className="form-control" {...order.ratio} />
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }

}
