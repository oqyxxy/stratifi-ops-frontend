import React, { Component, PropTypes } from 'react';
import { toDateString, getSpreadStatus, getSpreadPrice } from '../utils/filters';
import { Modal, ModalBody } from './modals';
import CreateSpread from './CreateSpread';
import ExecuteOrders from './ExecuteOrders';


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
      ordersToExecute = ordersToExecute.concat(spread.orders);
    }

    return ordersToExecute;
  }

  render() {
    const { spreads, securities, securitiesProvider, tagsProvider,
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
                  <th>Creation Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {
                 spreads.map((sprd, index) => (
                  <tr key={index}>
                    <td className="checkbox-cell">
                      {
                        getSpreadStatus(sprd) !== 'Executed' ? (
                          <label className="c-input c-checkbox">
                            <input onClick={e => this.toggleItem(sprd.id)} type="checkbox"/>
                            <span className="c-indicator icon-checkmark"/>
                          </label>
                        ) : null
                      }
                    </td>
                    <td>{sprd.description}</td>
                    <td>{sprd.orders.length}</td>
                    <td>{getSpreadPrice(sprd)}</td>
                    <td>{toDateString(sprd.creation_date)}</td>
                    <td>{getSpreadStatus(sprd)}</td>
                  </tr>
                ))
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
               className="modal-lg"
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
                          tagsProvider={tagsProvider} />
          </ModalBody>
        </Modal>

        <Modal id="executeSpreads"
               className="modal-lg"
               shown={this.state.executeSpreadsFormShown}
        >
          <ModalBody>
            <ExecuteOrders initialValues={{ orders: this.ordersToExecute }}
                           hideModal={this.hideExecuteModal}
                           packId={packId}
                           ordersProvider={ordersProvider}
                           packagesProvider={packagesProvider} />
          </ModalBody>
        </Modal>
      </div>
    );
  }

}
