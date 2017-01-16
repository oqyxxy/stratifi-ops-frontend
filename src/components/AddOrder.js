import React, { PropTypes, Component } from 'react';
import { DateField, DatePicker } from 'react-date-picker';
import { orderTypes, securityOptionTypes, securityTypes, orderKinds } from '../constants/enums';
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
    const containsOption = orders.find(ord => ord.security.type.value === 'Option');

    return (
      <table className="table table-bordered table-borderless-top editable-fields">
        <thead className="thead-graphite">
        <tr>
          <th>Order Name</th>
          <th>Target price</th>
          <th>Quantity</th>
          <th>Order kind</th>
          <th>Type</th>
          <th>Security type</th>
          <th>Security</th>
          { containsOption && <th>Option type</th> }
          { containsOption && <th>Strike price</th> }
          { containsOption && <th>Expiration date</th> }
        </tr>
        </thead>
        <tbody>
        {
          orders.map((order, index) => {
            const isOption = order.security.type.value === 'Option';
            return (
              <tr key={index}>
                <TableCellInput type="text"
                                placeholder="Enter order name"
                                className="form-control"
                                {...order.description} />
                <TableCellInput type="number"
                                placeholder="Target price"
                                className="form-control"
                                {...order.target_price} />
                <TableCellInput type="number"
                                placeholder="Quantity"
                                className="form-control"
                                {...order.quantity} />
                <TableCellSelect fieldData={order.order_kind}
                                 optionsData={orderKinds} />
                <TableCellSelect fieldData={order.type}
                                 optionsData={orderTypes}
                                 defaultOption={'type'} />
                <TableCellSelect fieldData={order.security.type}
                                 optionsData={securityTypes}
                                 defaultOption="security type" />
                <td>
                  <ListAutosuggest data={securities}
                                   fieldName="name"
                                   fieldData={order.security.name}
                                   placeholder="Security" />
                </td>
                {
                  isOption && <TableCellSelect fieldData={order.security.option_type}
                                               optionsData={securityOptionTypes}
                                               defaultOption={'select option type'}/>
                }
                {
                  isOption && <TableCellInput type="text"
                                              placeholder="Enter strike price"
                                              className="form-control"
                                              {...order.security.strike_price} />
                }
                {
                  isOption && (
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
                  )
                }
              <td className="action">
                <a onClick={() => orders.removeField(index)}>
                  <i className="icon-remove" />
                </a>
              </td>
            </tr>
              );
            }
          )
        }
        <tr>
          <td colSpan={containsOption ? 10 : 7}>
            <a onClick={() => orders.addField({order_kind: 'Limit'})} className="link"><i className="icon-add" /> Add Order</a>
          </td>
        </tr>
        </tbody>
      </table>
    );
  }

}
