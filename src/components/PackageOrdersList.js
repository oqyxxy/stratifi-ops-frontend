import React, { PropTypes, Component } from 'react';
import { Modal, ModalBody } from './modals';
import ExecuteOrders from './ExecuteOrders';


export default class PackageOrdersList extends Component {

  static propTypes = {
    orders: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { ordersToExecute: [], executeOrdersFormShown: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  toggleOrder(order) {
    const { ordersToExecute } = this.state;
    const index = ordersToExecute.findIndex(item => item.id === order.id);

    if (index !== -1) {
      this.setState({
        ...this.state,
        ordersToExecute: [...ordersToExecute.slice(0, index), ...ordersToExecute.slice(index + 1) ]
      });
    } else {
      this.setState({
        ...this.state,
        ordersToExecute: ordersToExecute.concat([order])
      });
    }
  }

  showModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, executeOrdersFormShown: true });
  }

  hideModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, executeOrdersFormShown: false });
  }

  onSubmit(event) {
    console.log(this.state.ordersToExecute);
    this.showModal(event);
  }

  render() {
    const { orders } = this.props;
    const { executeOrdersFormShown, ordersToExecute } = this.state;

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
                    <input onClick={e => this.toggleOrder(ord)} type="checkbox" />
                    <span className="c-indicator icon-checkmark"></span>
                  </label>
                </td>
                <td>{ord.description}</td>
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

        <Modal id="executeOrdersModal"
               className="modal-lg"
               shown={executeOrdersFormShown}
        >
          <ModalBody>
            <ExecuteOrders initialValues={{ orders: ordersToExecute }} hideModal={this.hideModal} />
          </ModalBody>
        </Modal>

      </div>
    );
  }

}
