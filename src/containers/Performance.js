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
        <td><FormattedNumber value={m.annualized_return} format="percent" /></td>
        <td><FormattedNumber value={m.annualized_volatility} format="percent" /></td>
        <td><FormattedNumber value={m.max_drawdown} format="percent" /></td>
        <td><FormattedNumber value={m.returns_inception} format="percent" /></td>
        <td><FormattedNumber value={m.returns_daily} format="percent" /></td>
        <td><FormattedNumber value={m.returns_wtd} format="percent" /></td>
        <td><FormattedNumber value={m.returns_mtd} format="percent" /></td>
        <td><FormattedNumber value={m.returns_qtd} format="percent" /></td>
        <td><FormattedNumber value={m.returns_ytd} format="percent" /></td>
      </tr>
    ));
    const secondBody = models.map((m, index) => (
      <tr key={index}>
        <td>{m.model}</td>
        <td>{m.num_accounts}</td>
        <td>{m.min_date}</td>
        <td>{m.max_date}</td>
      </tr>
    ));

    return (
      <section className="m-b-3">
        <h1>Performance</h1>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>

        {
          models.length ? (
            <div>
              <table className="table table-bordered table-borderless-top">
                <thead className="thead-graphite">
                  <tr>
                    <th>Model</th>
                    <th>Annualized Return</th>
                    <th>Annualized Volatility</th>
                    <th>Max Drawdown</th>
                    <th>Inception Return</th>
                    <th>Daily Return</th>
                    <th>WTD Return</th>
                    <th>MTD Return</th>
                    <th>QTD Return</th>
                    <th>YTD Return</th>
                  </tr>
                </thead>
                <tbody>{body}</tbody>
              </table>
              <table className="table table-bordered table-borderless-top">
                <thead className="thead-graphite">
                  <tr>
                    <th>Model</th>
                    <th>Number of accounts</th>
                    <th>Min date</th>
                    <th>Max date</th>
                  </tr>
                </thead>
                <tbody>{secondBody}</tbody>
              </table>
            </div>
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
