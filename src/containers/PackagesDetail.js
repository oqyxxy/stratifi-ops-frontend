import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PackagesProvider from '../providers/packages';
import SecuritiesProvider from '../providers/securities';
import SpreadsProvider from '../providers/spreads';
import TagsProvider from '../providers/tags';
import PackageOrdersList from '../components/PackageOrdersList';
import PackageSpreadsList from '../components/PackageSpreadsList';

import '../styles-local/ArrowLink.css';


class PackagesDetail extends Component {

  static propTypes = {
    packagesProvider: PropTypes.object.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    spreadsProvider: PropTypes.object.isRequired,
    securities: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    pack: PropTypes.object.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const { packagesProvider, id } = this.props;

    packagesProvider.getObject(id);
  }

  render() {
    const { pack, securities, securitiesProvider, tags, tagsProvider, spreadsProvider, id } = this.props;

    return pack.description ? (
      <section className="arrow-link-container">
        <Link to="/packages" className="arrow-link">
          <i className="icon-arrow" />
        </Link>

        <h1>{`Package ${pack.description}`}</h1>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>

        <h3 className="text-title m-t-3">Orders</h3>
        <PackageOrdersList orders={pack.orders} />

        <h3 className="text-title m-t-3">Spreads</h3>
        <PackageSpreadsList securities={securities}
                            securitiesProvider={securitiesProvider}
                            spreads={pack.spreads}
                            spreadsProvider={spreadsProvider}
                            tagsProvider={tagsProvider}
                            packId={id}
                            tags={tags} />
      </section>
    ) : false;
  }

}


export default connect(
  (state, ownProps) => ({
    pack: state.packages.object,
    id: ownProps.params.id,
    securities: state.securities.list,
    tags: state.tags.list,
  }),
  dispatch => ({
    packagesProvider: new PackagesProvider(dispatch),
    securitiesProvider: new SecuritiesProvider(dispatch),
    tagsProvider: new TagsProvider(dispatch),
    spreadsProvider: new SpreadsProvider(dispatch),
  })
)(PackagesDetail);
