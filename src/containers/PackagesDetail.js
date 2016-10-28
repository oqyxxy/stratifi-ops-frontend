import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PackagesProvider from '../providers/packages';
import PackageOrdersList from '../components/PackageOrdersList';


class PackagesDetail extends Component {

  static propTypes = {
    packagesProvider: PropTypes.object.isRequired,
    pack: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { packagesProvider, routing } = this.props;

    console.log(routing);
    packagesProvider.getObject({
      id: 1,
      name: 'Package Name 1',
      totalOrders: 20,
      totalSpreads: 500,
      creationDate: '10/16/2016',
      description: 'Duis ollis est no comodo',
      spreads: [
        {name: 'Spread1'}, {'name': 'Spread2'}, {'name': 'Spread3'}
      ],
      orders: [
        {
          id: 1,
          name: 'Order1',
          security: 'Security Name',
          target_price: 218.0,
          creation_date: '2016-10-28T12:32:02.359879+00:00',
          status: 'Open'
        },
        {
          id: 2,
          name: 'Order2',
          security: 'Security Name',
          target_price: 286.2,
          creation_date: '2016-10-28T12:32:02.359879+00:00',
          status: 'In Progress'
        },
        {
          id: 3,
          name: 'Order3',
          security: 'Security Name',
          target_price: 718.9,
          creation_date: '2016-10-28T12:32:02.359879+00:00',
          status: 'Open'
        }
      ]
    });
  }

  render() {
    const { pack } = this.props;

    return pack.name ? (
      <section>
        <h1>{`Package ${pack.name}`}</h1>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>

        <h3 className="text-title m-t-3">Orders</h3>
        <PackageOrdersList orders={pack.orders} />
      </section>
    ) : false;
  }

}


export default connect(
  state => ({
    pack: state.packages.object,
    routing: state.routing
  }),
  dispatch => ({
    packagesProvider: new PackagesProvider(dispatch)
  })
)(PackagesDetail);
