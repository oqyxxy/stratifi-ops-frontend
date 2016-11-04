import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toDateString } from '../utils/filters';
import PackagesProvider from '../providers/packages';
import SpreadsProvider from '../providers/spreads';
import SecuritiesProvider from '../providers/securities';
import TagsProvider from '../providers/tags';
import { Modal, ModalBody } from '../components/modals';
import CreatePackage from '../components/CreatePackage';

import '../styles-local/PackagesList.css';


class PackagesList extends Component {

  constructor(props) {
    super(props);
    this.state = { createPackageFormShown: false, searchFilter: '' };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  static propTypes = {
    packages: PropTypes.array.isRequired,
    spreads: PropTypes.array.isRequired,
    securities: PropTypes.array.isRequired,
    packagesProvider: PropTypes.object.isRequired,
    spreadsProvider: PropTypes.object.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.packagesProvider.getList();
    this.props.spreadsProvider.getList([{name: 'Spread1'}, {'name': 'Spread2'}, {'name': 'Spread3'}]);
  }

  get packages() {
    return this.props.packages.filter(pack => pack.description.indexOf(this.state.searchFilter) !== -1);
  }

  showModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, createPackageFormShown: true });
  }

  hideModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, createPackageFormShown: false });
  }

  render() {
    const { packagesProvider, spreads, securitiesProvider, securities, tags, tagsProvider } = this.props;
    const tableBody = this.packages.map(pack => (
      <tr key={pack.id}>
        <td><Link to={`/packages/${pack.id}`}>{pack.name || pack.description}</Link></td>
        <td>{pack.orders.length}</td>
        <td>{pack.spreads.length}</td>
        <td>{toDateString(pack.creation_date)}</td>
        <td>{pack.description}</td>
      </tr>
    ));

    return (
      <section className="packages-container">
        <h1>Packages</h1>
        <div className="packages-filter">
          <i className="icon-search" />
          <input type="text"
                 placeholder="Search all packages"
                 onChange={e => this.setState({ ...this.state, searchFilter: e.target.value })} />
        </div>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>

        {
          this.packages.length ? (
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
          ) : (
            <p>There are no packages :(</p>
          )
        }
        <button className="btn btn-primary btn-title"
                onClick={this.showModal}>Create a package</button>

        <Modal id="createPackage"
               className="modal-lg"
               shown={this.state.createPackageFormShown}
        >
          <ModalBody>
            <CreatePackage securitiesProvider={securitiesProvider}
                           securities={securities}
                           hideModal={this.hideModal}
                           spreads={spreads}
                           packagesProvider={packagesProvider}
                           tags={tags}
                           tagsProvider={tagsProvider} />
          </ModalBody>
        </Modal>

      </section>
    );
  }

}


export default connect(
  state => ({
    packages: state.packages.list,
    spreads: state.spreads.list,
    securities: state.securities.list,
    tags: state.tags.list,
  }),
  dispatch => ({
    packagesProvider: new PackagesProvider(dispatch),
    spreadsProvider: new SpreadsProvider(dispatch),
    securitiesProvider: new SecuritiesProvider(dispatch),
    tagsProvider: new TagsProvider(dispatch),
  })
)(PackagesList);
