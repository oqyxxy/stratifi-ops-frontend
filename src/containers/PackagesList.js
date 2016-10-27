import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from '../components/modals';
import CreatePackage from '../components/CreatePackage';


class PackagesList extends Component {

  constructor(props) {
    super(props);
    this.state = { createPackageFormShown: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  static propTypes = {
    packages: PropTypes.array.isRequired
  };

  showModal() {
    this.setState({ createPackageFormShown: true });
  }

  hideModal() {
    this.setState({ createPackageFormShown: false });
  }

  render() {
    const tableBody = this.props.packages.map(pack => (
      <tr key={pack.id}>
        <td>{pack.name}</td>
        <td>{pack.totalOrders}</td>
        <td>{pack.totalSpreads}</td>
        <td>{pack.creationDate}</td>
        <td>{pack.description}</td>
      </tr>
    ));

    return (
      <section>
        <h1>Packages</h1>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>
        <table className="table table-bordered table-borderless-top">
          <thead className="thead-graphite">
            <tr>
              <th>Package Name</th>
              <th>Total Orders</th>
              <th>Total Spreads</th>
              <th>Creation Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
        <button className="btn btn-primary btn-title"
                onClick={this.showModal}>Create a package</button>

        <Modal id="createPackage"
               className="modal-lg"
               shown={this.state.createPackageFormShown}
        >
          <ModalHeader title="Create a package" hideModal={this.hideModal} />
          <ModalBody>
            <CreatePackage hideModal={this.hideModal} />
          </ModalBody>
        </Modal>

      </section>
    );
  }

};


export default connect(
  state => ({
    packages: state.packages
  }),
  dispatch => ({})
)(PackagesList);
