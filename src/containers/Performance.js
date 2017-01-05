import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedNumber } from 'react-intl';

import ModelsProvider from '../providers/models';
import '../styles-local/Performance.css';


class Performance extends Component {

  static propTypes = {
    models: PropTypes.array.isRequired,
    modelsProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      sortCol: null,
      desc: true
    };
  }

  setSort(colName) {
    if (this.state.sortCol === colName) {
      this.setState({ ...this.state, desc: !this.state.desc });
    } else {
      this.setState({ sortCol: colName, desc: true });
    }
  }

  get sortedModels() {
    const { sortCol, desc } = this.state;
    return this.props.models.sort((a, b) => (a[sortCol] - b[sortCol]) * (desc ? 1 : -1));
  }

  componentDidMount() {
    this.props.modelsProvider.getList();
  }

  regeneratePerformance() {
    this.props.modelsProvider.regeneratePerformance();
  }

  render() {
    const { models } = this.props;
    const { sortCol } = this.state;
    const body = this.sortedModels.map((m, index) => (
      <tr key={index}>
        <td>
          <Link to={{
            pathname: `strategy/${m.task_id}`,
            query: {
              basis: m.model == 'Basis Strategy' ? 1 : 0
            }
          }}>{m.model}</Link></td>
        
        <td><FormattedNumber value={m.returns_daily} format="percent" /></td>
        <td><FormattedNumber value={m.returns_wtd} format="percent" /></td>
        <td><FormattedNumber value={m.returns_mtd} format="percent" /></td>
        <td><FormattedNumber value={m.returns_qtd} format="percent" /></td>
        <td><FormattedNumber value={m.returns_ytd} format="percent" /></td>
        <td><FormattedNumber value={m.returns_inception} format="percent" /></td>
        <td><FormattedNumber value={m.annualized_return} format="percent" /></td>
        <td><FormattedNumber value={m.annualized_volatility} format="percent" /></td>
        <td><FormattedNumber value={m.max_drawdown} format="percent" /></td>
       
      </tr>
    ));
    const secondBody = models.map((m, index) => (
      <tr key={index}>
        <td><Link to={{
            pathname: `strategy/${m.task_id}`,
            query: {
              basis: m.model == 'Basis Strategy' ? 1 : 0
            }
          }}>{m.model}</Link></td>
        <td>{m.num_accounts}</td>
        <td>{m.min_date}</td>
        <td>{m.max_date}</td>
      </tr>
    ));

    return (
      <div className="performance-container">
        <section className="m-b-3">
          <h1>Performance</h1>
          <p>
            Daily Performance of the Overlay strategies.
          </p>
          <button className="btn btn-title btn-primary" onClick={this.regeneratePerformance.bind(this)}>
            Regenerate performance
          </button>

          {
            models.length ? (
              <div>
                <div style={{overflowX: 'auto'}}>
                  <table className="table table-bordered table-borderless-top sorted-table">
                    <thead className="thead-graphite">
                      <tr>
                        <th>Model</th>
                        <th onClick={this.setSort.bind(this, 'returns_daily')} className={sortCol == 'returns_daily' ? 'current-sort' : ''}>Daily Return</th>
                        <th onClick={this.setSort.bind(this, 'returns_wtd')} className={sortCol == 'returns_wtd' ? 'current-sort' : ''}>WTD Return</th>
                        <th onClick={this.setSort.bind(this, 'returns_mtd')} className={sortCol == 'returns_mtd' ? 'current-sort' : ''}>MTD Return</th>
                        <th onClick={this.setSort.bind(this, 'returns_qtd')} className={sortCol == 'returns_qtd' ? 'current-sort' : ''}>QTD Return</th>
                        <th onClick={this.setSort.bind(this, 'returns_ytd')} className={sortCol == 'returns_ytd' ? 'current-sort' : ''}>YTD Return</th>
                        <th onClick={this.setSort.bind(this, 'returns_inception')} className={sortCol == 'returns_inception' ? 'current-sort' : ''}>Inception Return</th>
                        <th onClick={this.setSort.bind(this, 'annualized_return')} className={sortCol == 'annualized_return' ? 'current-sort' : ''}>Annualized Return</th>
                        <th onClick={this.setSort.bind(this, 'annualized_volatility')} className={sortCol == 'annualized_volatility' ? 'current-sort' : ''}>Annualized Volatility</th>
                        <th onClick={this.setSort.bind(this, 'max_drawdown')} className={sortCol == 'max_drawdown' ? 'current-sort' : ''}>Max Drawdown</th>
                  </tr>
                    </thead>
                    <tbody>{body}</tbody>
                  </table>
                </div>
                <div style={{overflowX: 'auto'}}>
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
              </div>
            ) : (
              <p>There are no models.</p>
            )
          }

          <Link to="/" className="btn btn-primary btn-black btn-title">Back to dashboard</Link>
        </section>
      </div>
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
