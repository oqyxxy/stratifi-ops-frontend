import React, { Component, PropTypes } from 'react';
import { Modal, ModalBody } from './modals';
import CreateSpread from './CreateSpread';
import ExecuteOrders from './ExecuteOrders';
import SpreadListItem from './SpreadListItem';


export default class PackageSpreadsList extends Component {

  static propTypes = {
    spreads: PropTypes.array.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    ordersProvider: PropTypes.object.isRequired,
    packagesProvider: PropTypes.object.isRequired,
    spreadsProvider: PropTypes.object.isRequired,
    securities: PropTypes.array.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    packId: PropTypes.string.isRequired,
    multiplier: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      spreadsToExecute: [],
      createSpreadFormShown: false,
      executeSpreadsFormShown: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showExecuteModal = this.showExecuteModal.bind(this);
    this.hideExecuteModal = this.hideExecuteModal.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }

  refreshPackageData() {
    const { packagesProvider, id } = this.props;
    packagesProvider.getObject(id);
  }

  toggleItem(id) {
    const { spreadsToExecute } = this.state;
    const index = spreadsToExecute.indexOf(id);

    if (index !== -1) {
      this.setState({
        ...this.state,
        spreadsToExecute: [...spreadsToExecute.slice(0, index), ...spreadsToExecute.slice(index + 1) ]
      });
    } else {
      this.setState({
        ...this.state,
        spreadsToExecute: spreadsToExecute.concat([id])
      });
    }
  }

  showModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, createSpreadFormShown: true });
  }

  hideModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, createSpreadFormShown: false });
  }

  showExecuteModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, executeSpreadsFormShown: true });
  }

  hideExecuteModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, executeSpreadsFormShown: false });
  }

  get ordersToExecute() {
    let ordersToExecute = [];

    for (let spreadId of this.state.spreadsToExecute) {
      const spread = this.props.spreads.find(s => s.id === spreadId);
      const orders = spread.orders.map(order => ({...order, multiplier: spread.multiplier}));
      ordersToExecute = ordersToExecute.concat(orders);
    }

    return ordersToExecute;
  }

  render() {
    const { spreads, securities, securitiesProvider, tagsProvider, multiplier,
            tags, spreadsProvider, packId, packagesProvider, ordersProvider } = this.props;

    return (
      <div>
        {
          spreads.length ? (
            <table className="table table-bordered table-borderless-top">
              <thead className="thead-graphite">
                <tr>
                  <th className="checkbox-cell" />
                  <th>Spread Name</th>
                  <th># of Orders</th>
                  <th>Target Price</th>
                  <th>Quantity</th>
                  <th>Creation Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {
                 spreads.sort((a, b) => a.id - b.id).map((sprd, index) => (
                   <SpreadListItem sprd={sprd}
                                   key={sprd.id}
                                   multiplier={multiplier}
                                   toggleSpread={this.toggleItem} />)
                 )
              }
              </tbody>
            </table>
          ) : (
            <p>No spreads for this package</p>
          )
        }

        <div className="m-b-3">
          <button onClick={this.showModal} className="btn btn-primary btn-black btn-title m-r-1">Create a spread</button>
          {
            spreads.length ? (
              <button onClick={this.showExecuteModal}
                      disabled={!this.state.spreadsToExecute.length}
                      className="btn btn-primary btn-title">Execute orders</button>
            ) : null
          }
        </div>

        <Modal id="createSpread"
               className="modal-lg wide"
               shown={this.state.createSpreadFormShown}
        >
          <ModalBody>
            <CreateSpread securities={securities}
                          securitiesProvider={securitiesProvider}
                          spreadsProvider={spreadsProvider}
                          packagesProvider={packagesProvider}
                          hideModal={this.hideModal}
                          tags={tags}
                          packId={packId}
                          ordersProvider={ordersProvider}
                          tagsProvider={tagsProvider} />
          </ModalBody>
        </Modal>

        <Modal id="executeSpreads"
               className="modal-lg wide"
               shown={this.state.executeSpreadsFormShown}
        >
          <ModalBody>
            <ExecuteOrders initialValues={{ orders: this.ordersToExecute }}
                           hideModal={this.hideExecuteModal}
                           onSuccess={this.refreshPackageData.bind(this)}
                           multiplier={multiplier}
                           ordersProvider={ordersProvider} />
          </ModalBody>
        </Modal>
      </div>
    );
  }

}
