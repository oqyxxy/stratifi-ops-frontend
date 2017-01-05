import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PackagesProvider from '../providers/packages';
import { toDateString } from '../utils/filters';

import '../styles-local/PackagesList.css';


class PackagesList extends Component {

  constructor(props) {
    super(props);
    this.state = { searchFilter: '' };
  }

  static propTypes = {
    packages: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.packagesProvider.getList();
  }

  get packages() {
    return this.props.packages.filter(pack => pack.description.indexOf(this.state.searchFilter) !== -1);
  }

  render() {
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
      <div className="container">
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

          <Link className="btn btn-primary btn-title" to="/packages/create">Create a package</Link>
        </section>
      </div>
    );
  }

}


export default connect(
  state => ({
    packages: state.packages.list
  }),
  dispatch => ({
    packagesProvider: new PackagesProvider(dispatch)
  })
)(PackagesList);
