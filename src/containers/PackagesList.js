import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PackagesProvider from '../providers/packages';
import SpreadsProvider from '../providers/spreads';
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
    packages: PropTypes.array.isRequired,
    spreads: PropTypes.array.isRequired,
    packagesProvider: PropTypes.object.isRequired,
    spreadsProvider: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.packagesProvider.getList([
      {id: 1, name: 'Package Name 1', totalOrders: 20, totalSpreads: 500, creationDate: '10/16/2016', description: 'Duis ollis est no comodo'},
      {id: 2, name: 'Package Name 2', totalOrders: 50, totalSpreads: 100, creationDate: '10/16/2016', description: 'Duis ollis est no comodo'}
    ]);
    this.props.spreadsProvider.getList([{name: 'Spread1'}, {'name': 'Spread2'}, {'name': 'Spread3'}]);
  }

  showModal() {
    this.setState({ createPackageFormShown: true });
  }

  hideModal() {
    this.setState({ createPackageFormShown: false });
  }

  render() {
    const { packagesProvider, spreads } = this.props;
    const tableBody = this.props.packages.map(pack => (
      <tr key={pack.id}>
        <td><Link to={`/packages/${pack.id}`}>{pack.name}</Link></td>
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
            <CreatePackage hideModal={this.hideModal} spreads={spreads} packagesProvider={packagesProvider} />
          </ModalBody>
        </Modal>

      </section>
    );
  }

};


export default connect(
  state => ({
    packages: state.packages.list,
    spreads: state.spreads.list
  }),
  dispatch => ({
    packagesProvider: new PackagesProvider(dispatch),
    spreadsProvider: new SpreadsProvider(dispatch),
  })
)(PackagesList);
