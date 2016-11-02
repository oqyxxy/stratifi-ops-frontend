import React, { PropTypes, Component } from 'react';
import { orderTypes } from '../constants/enums';
import { TableCellInput, TableCellSelect } from './form';


export default class AddOrder extends Component {

  static propTypes = {
    orders: PropTypes.array.isRequired,
    securities: PropTypes.array.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { securitiesProvider, tagsProvider } = this.props;

    securitiesProvider.getList();
    tagsProvider.getList();
  }

  render() {
    const { orders, securities, tags } = this.props;

    return (
      <table className="table table-bordered table-borderless-top editable-fields">
        <thead className="thead-graphite">
        <tr>
          <th>Order Name</th>
          <th>Security</th>
          <th>Type</th>
          <th>Tag</th>
        </tr>
        </thead>
        <tbody>
        {
          orders.map((order, index) => (
            <tr key={index}>
              <TableCellInput type="text" placeholder="Enter order name" className="form-control" {...order.description} />
              <TableCellSelect fieldData={order.security}
                               optionsData={securities.map(s => s.name)}
                               defaultOption={'select security'}/>
              <TableCellSelect fieldData={order.type}
                               optionsData={orderTypes}
                               defaultOption={'select type'}/>
              <TableCellSelect fieldData={order.tags}
                               optionsData={tags.map(s => s.name)}
                               defaultOption={'select tag'}/>
            </tr>
          ))
        }
        <tr>
          <td colSpan="4">
            <a onClick={() => orders.addField({})} className="link"><i className="icon-add"></i> Add Order</a>
          </td>
        </tr>
        </tbody>
      </table>
    );
  }

}
