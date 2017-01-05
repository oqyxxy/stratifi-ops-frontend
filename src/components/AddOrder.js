import React, { PropTypes, Component } from 'react';
import { orderTypes, securityOptionTypes } from '../constants/enums';
import { TableCellInput, TableCellSelect, ListAutosuggest } from './form';


export default class AddOrder extends Component {

  static propTypes = {
    orders: PropTypes.array.isRequired,
    securities: PropTypes.array.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { securitiesProvider } = this.props;

    securitiesProvider.getList();
  }

  render() {
    const { orders, securities } = this.props;

    return (
      <table className="table table-bordered table-borderless-top editable-fields">
        <thead className="thead-graphite">
        <tr>
          <th>Order Name</th>
          <th>Type</th>
          <th>Security</th>
          <th>Option type</th>
          <th>Strike price</th>
          <th>Expiration price</th>
        </tr>
        </thead>
        <tbody>
        {
          orders.map((order, index) => (
            <tr key={index}>
              <TableCellInput type="text" placeholder="Enter order name" className="form-control" {...order.description} />
              <TableCellSelect fieldData={order.type}
                               optionsData={orderTypes}
                               defaultOption={'select type'} />
              <td>
                <ListAutosuggest data={securities} fieldName="name" fieldData={order.security.name} placeholder="Security" />
              </td>
              <TableCellSelect fieldData={order.security.option_type} optionsData={securityOptionTypes} defaultOption={'select option type'} />
              <TableCellInput type="text" placeholder="Enter strike price" className="form-control" {...order.security.strike_price} />
              <TableCellInput type="text" placeholder="Enter expiration price" className="form-control" {...order.security.expiration_price} />
              <td className="action">
                <a onClick={() => orders.removeField(index)}>
                  <i className="icon-remove" />
                </a>
              </td>
            </tr>
          ))
        }
        <tr>
          <td colSpan="7">
            <a onClick={() => orders.addField({})} className="link"><i className="icon-add" /> Add Order</a>
          </td>
        </tr>
        </tbody>
      </table>
    );
  }

}
