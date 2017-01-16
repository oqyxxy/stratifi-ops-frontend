import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SpreadsProvider from '../providers/spreads';
import OrdersProvider from '../providers/orders';
import OrdersList from '../components/OrdersList';


class SpreadDetail extends Component {

  static propTypes = {
    spreadsProvider: PropTypes.object.isRequired,
    ordersProvider: PropTypes.object.isRequired,
    spread: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { spreadsProvider, id } = this.props;
    spreadsProvider.getObject(id);
  }

  refreshSpreadData() {
    const { id, spreadsProvider } = this.props;
    spreadsProvider.getObject(id);
  }

  render() {
    const { spread, ordersProvider } = this.props;
    return spread.orders ? (
      <div className="package-container">
        <section className="arrow-link-container">

          <h1>{`Spread ${spread.description}`}</h1>
          <p>
            Nullam quis risus eget urna mollis ornare vel eu leo.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
          </p>

          <h3 className="text-title m-t-3">Orders</h3>
          <OrdersList orders={spread.orders}
                      onSuccess={this.refreshSpreadData.bind(this)}
                      multiplier={spread.multiplier}
                      ordersProvider={ordersProvider} />
        </section>
      </div>
    ) : null;
  }

}


export default connect(
  (state, ownProps) => ({
    spread: state.spreads.object || {},
    id: ownProps.params.id
  }),
  dispatch => ({
    spreadsProvider: new SpreadsProvider(dispatch),
    ordersProvider: new OrdersProvider(dispatch)
  })
)(SpreadDetail);
