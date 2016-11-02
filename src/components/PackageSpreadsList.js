import React, { Component, PropTypes } from 'react';
import { Modal, ModalBody } from './modals';
import CreateSpread from './CreateSpread';


export default class PackageSpreadsList extends Component {

  static propTypes = {
    spreads: PropTypes.array.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
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
      createSpreadFormShown: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  onSubmit() {
    console.log(this.state.spreadsToExecute);
  }

  render() {
    const { spreads, securities, securitiesProvider, tagsProvider,
            tags, spreadsProvider, packId, packagesProvider } = this.props;

    return (
      <div>
        <table className="table table-bordered table-borderless-top">
          <thead className="thead-graphite">
            <tr>
              <th className="checkbox-cell" />
              <th>Spread Name</th>
              <th># of Orders</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
          {
             spreads.map((sprd, index) => (
              <tr key={index}>
                <td className="checkbox-cell">
                  <label className="c-input c-checkbox">
                    <input onClick={e => this.toggleItem(sprd.id)} type="checkbox" />
                    <span className="c-indicator icon-checkmark" />
                  </label>
                </td>
                <td>{sprd.description}</td>
                <td>{sprd.orders.length ? sprd.orders.join(', ') : 'No tags for this spread'}</td>
                <td>{sprd.creation_date}</td>
              </tr>
            ))
          }
          </tbody>
        </table>

        <div className="m-b-3">
          <button onClick={this.showModal} className="btn btn-primary btn-black btn-title m-r-1">Create a spread</button>
          <button onClick={this.onSubmit.bind(this)} className="btn btn-primary btn-title">Execute spreads</button>
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
      </div>
    );
  }

}
