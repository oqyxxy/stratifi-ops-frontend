import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedNumber } from 'react-intl';
import ModelsProvider from '../providers/models';


class Performance extends Component {

  static propTypes = {
    models: PropTypes.array.isRequired,
    modelsProvider: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.modelsProvider.getList();
  }

  render() {
    const { models } = this.props;
    const body = models.map((m, index) => (
      <tr key={index}>
        <td>{m.model}</td>
        <td><FormattedNumber value={m.strategy.metrics.annualized_return} format="percent" /></td>
        <td><FormattedNumber value={m.strategy.metrics.annualized_volatility} format="percent" /></td>
        <td><FormattedNumber value={m.strategy.metrics.max_drawdown} format="percent" /></td>
      </tr>
    ));

    return (
      <section>
        <h1>Performance</h1>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>

        {
          models.length ? (
            <table className="table table-bordered table-borderless-top">
              <thead className="thead-graphite">
                <tr>
                  <th>Model</th>
                  <th>Annualized Return</th>
                  <th>Annualized Volatility</th>
                  <th>Max Drawdown</th>
                </tr>
              </thead>
              <tbody>{body}</tbody>
            </table>
          ) : (
            <p>There are no models.</p>
          )
        }

        <Link to="/" className="btn btn-primary btn-black btn-title">Back to dashboard</Link>
      </section>
    );
  }

}


export default connect(
  state => ({
    models: state.models.list,
  }),
  dispatch => ({
    modelsProvider: new ModelsProvider(dispatch),
  })
)(Performance);
