import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PackagesProvider from '../providers/packages';
import PackageOrdersList from '../components/PackageOrdersList';
import PackageSpreadsList from '../components/PackageSpreadsList';

import '../styles-local/ArrowLink.css';


class PackagesDetail extends Component {

  static propTypes = {
    packagesProvider: PropTypes.object.isRequired,
    pack: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { packagesProvider, id } = this.props;

    packagesProvider.getObject(id);
  }

  render() {
    const { pack } = this.props;

    return pack.name ? (
      <section className="arrow-link-container">
        <Link to="/packages" className="arrow-link">
          <i className="icon-arrow" />
        </Link>

        <h1>{`Package ${pack.name}`}</h1>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>

        <h3 className="text-title m-t-3">Orders</h3>
        <PackageOrdersList orders={pack.orders} />

        <h3 className="text-title m-t-3">Spreads</h3>
        <PackageSpreadsList spreads={pack.spreads} />
      </section>
    ) : false;
  }

}


export default connect(
  (state, ownProps) => ({
    pack: state.packages.object,
    id: ownProps.params.id
  }),
  dispatch => ({
    packagesProvider: new PackagesProvider(dispatch)
  })
)(PackagesDetail);
