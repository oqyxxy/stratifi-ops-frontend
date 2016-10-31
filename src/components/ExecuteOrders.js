import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { TableCellInput } from './form';


class ExecuteOrders extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { executed: 0 };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log(values);
    this.setState({ executed: values.orders.length });
  }

  render() {
    const { fields, handleSubmit, hideModal, invalid, submitting } = this.props;
    const { executed } = this.state;

    return executed ? (
      <div className="text-xs-center">
        <h3>{`You have successfully executed ${executed} orders`}</h3>
        <p>
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="btn btn-primary btn-title" onClick={hideModal}>Back to package</button>
      </div>
    ) : (
      <div>
        <h3 className="text-title">Execute order</h3>
        <p>You are currently executing the following orders</p>
        <form autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>
          <table className="table table-bordered table-borderless-top editable-fields">
            <thead className="thead-graphite">
              <tr>
                <th>Orders</th>
                <th>Executed Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {
                fields.orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name.value}</td>
                    <TableCellInput type="text" placeholder="Enter Price" className="form-control" {...order.executed_price} />
                    <TableCellInput type="text" placeholder="Enter Quantity" className="form-control" {...order.quantity} />
                  </tr>
                ))
              }
            </tbody>
          </table>
        </form>

        <div className="text-xs-center m-b-1">
          <button disabled={invalid || submitting}
                  type="submit"
                  className="btn btn-success btn-title"
                  onClick={handleSubmit(this.onSubmit)}>Execute orders</button>
        </div>

        <div className="text-xs-center">
          <button className="btn btn-link" onClick={hideModal}>Back to Package</button>
        </div>
      </div>
    );
  }

}


export default reduxForm({
  form: 'executeOrders',
  fields: [
    'orders[].id',
    'orders[].name',
    'orders[].executed_price',
    'orders[].quantity'
  ]
})(ExecuteOrders);
