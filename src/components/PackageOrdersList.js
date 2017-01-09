import React, { PropTypes, Component } from 'react';
import { Modal, ModalBody } from './modals';
import ExecuteOrders from './ExecuteOrders';
import OrderListItem from './OrderListItem';


export default class PackageOrdersList extends Component {

  static propTypes = {
    orders: PropTypes.array.isRequired,
    packId: PropTypes.string.isRequired,
    ordersProvider: PropTypes.object.isRequired,
    packagesProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { ordersToExecute: [], executeOrdersFormShown: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.updateMultiplier = this.updateMultiplier.bind(this);
    this.undoMultiplier = this.undoMultiplier.bind(this);
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
    this.showModal(event);
  }

  updateMultiplier(id, multiplier) {
    const { packId, ordersProvider, packagesProvider } = this.props;
    ordersProvider.updateMultiplier({id, multiplier}).then(() => packagesProvider.getObject(packId));
  }

  undoMultiplier(ord) {
    const { packId, ordersProvider, packagesProvider } = this.props;
    ordersProvider.updateMultiplier({
      id: ord.id,
      multiplier: ord.prev_multiplier
    }).then(() => packagesProvider.getObject(packId));
  }

  render() {
    const { orders, ordersProvider, packagesProvider, packId } = this.props;
    const { executeOrdersFormShown, ordersToExecute } = this.state;

    return (
      <div>
        {
          orders.length ? (
            <table className="table table-bordered table-borderless-top">
              <thead className="thead-graphite">
              <tr>
                <th className="checkbox-cell"></th>
                <th>Order Name</th>
                <th>Security</th>
                <th>Target Price</th>
                <th>Multiplier</th>
                <th>Creation Date</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {
                orders.sort((a, b) => a.id - b.id).map((ord, index) => (
                  <OrderListItem ord={ord}
                                 key={ord.id}
                                 form={`order-list-item-${ord.id}`}
                                 updateMultiplier={this.updateMultiplier}
                                 undoMultiplier={this.undoMultiplier}
                                 toggleOrder={this.toggleOrder} />
                ))
              }
              </tbody>
            </table>
          ) : (
            <p>No orders for this package</p>
          )
        }

        {
          orders.length ? (
            <button disabled={!ordersToExecute.length}
                    onClick={this.onSubmit.bind(this)}
                    className="btn btn-primary btn-title">Execute orders</button>
          ) : null
        }

        <Modal id="executeOrdersModal"
               className="modal-lg wide"
               shown={executeOrdersFormShown}
        >
          <ModalBody>
            <ExecuteOrders initialValues={{ orders: ordersToExecute }}
                           packId={packId}
                           ordersProvider={ordersProvider}
                           packagesProvider={packagesProvider}
                           hideModal={this.hideModal} />
          </ModalBody>
        </Modal>

      </div>
    );
  }

}
