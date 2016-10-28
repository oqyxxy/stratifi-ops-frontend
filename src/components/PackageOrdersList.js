import React, { PropTypes, Component } from 'react';


export default class PackageOrdersList extends Component {

  static propTypes = {
    orders: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { ordersToExecute: [] };
  }

  toggleOrder(id) {
    const { ordersToExecute } = this.state;
    const index = ordersToExecute.indexOf(id);

    if (index != -1) {
      this.setState({ ordersToExecute: [...ordersToExecute.slice(0, index), ...ordersToExecute.slice(index + 1) ]})
    } else {
      this.setState({ ordersToExecute: ordersToExecute.concat([id]) });
    }
  }

  onSubmit() {
    console.log(this.state.ordersToExecute);
  }

  render() {
    const { fields, orders } = this.props;

    return (
      <div>
        <table className="table table-bordered table-borderless-top">
          <thead className="thead-graphite">
            <tr>
              <th className="checkbox-cell"></th>
              <th>Order Name</th>
              <th>Security</th>
              <th>Target Price</th>
              <th>Creation Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
            orders.map((ord, index) => (
              <tr key={index}>
                <td className="checkbox-cell">
                  <label className="c-input c-checkbox">
                    <input onClick={e => this.toggleOrder(ord.id)} type="checkbox" />
                    <span className="c-indicator icon-checkmark"></span>
                  </label>
                </td>
                <td>{ord.name}</td>
                <td>{ord.security}</td>
                <td>{ord.target_price}</td>
                <td>{ord.creation_date}</td>
                <td>{ord.status}</td>
              </tr>
            ))
          }
          </tbody>
        </table>

        <button onClick={this.onSubmit.bind(this)} className="btn btn-primary btn-title">Execute orders</button>
      </div>
    );
  }

}
