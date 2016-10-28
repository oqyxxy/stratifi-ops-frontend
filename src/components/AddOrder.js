import React from 'react';
import { TableCellInput, TableCellSelect } from './form';


const AddOrder = props => {

  const { orders } = props;

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
            <TableCellInput type="text" placeholder="Enter order name" className="form-control" {...order.name} />
            <TableCellSelect fieldData={order.security}
                             optionsData={['security1', 'security2', 'security3']}
                             defaultOption={'select security'} />
            <TableCellSelect fieldData={order.type}
                             optionsData={['type1', 'type2', 'type3']}
                             defaultOption={'select type'} />
            <TableCellSelect fieldData={order.tag}
                             optionsData={['tag1', 'tag2', 'tag3']}
                             defaultOption={'select tag'} />
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

};

export default AddOrder;
