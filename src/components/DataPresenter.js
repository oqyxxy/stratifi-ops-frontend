import React, { Component, PropTypes } from 'react';
import { FormattedNumber } from 'react-intl';
import '../styles-local/DataPresenter.css';


export default class DataPresenter extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    plots: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    underlyingSymbol: PropTypes.string.isRequired,
    backtestsProvider: PropTypes.object.isRequired
  };

  render() {
    const { title, data, plots, backtestsProvider, underlyingSymbol } = this.props;
    const { underlying, Strategy: strategy } = data;

    return (
      <div className="data-presenter">
        <h5>{title}</h5>
        <img src={backtestsProvider.getImageURL(plots["1_plot_portfolio_values"])} role="presentation" />
        <table className="table table-bordered table-borderless-top">
          <thead className="thead-graphite">
            <tr>
              <th>Performance Metric</th>
              <th>{underlyingSymbol}</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total return</td>
              <td><FormattedNumber value={underlying.total_return} format="decimal" /></td>
              <td><FormattedNumber value={strategy.total_return} format="decimal" /></td>
            </tr>
            <tr>
              <td>Max dd months to recover</td>
              <td><FormattedNumber value={underlying.max_dd_months_to_recover} format="decimal" /></td>
              <td><FormattedNumber value={strategy.max_dd_months_to_recover} format="decimal" /></td>
            </tr>
            <tr>
              <td>Max drawdown</td>
              <td><FormattedNumber value={underlying.max_drawdown} format="decimal" /></td>
              <td><FormattedNumber value={strategy.max_drawdown} format="decimal" /></td>
            </tr>
            <tr>
              <td>Annual return</td>
              <td><FormattedNumber value={underlying.annual_return} format="decimal" /></td>
              <td><FormattedNumber value={strategy.annual_return} format="decimal" /></td>
            </tr>
            <tr>
              <td>Capture up</td>
              <td><FormattedNumber value={underlying.capture_up} format="decimal" /></td>
              <td><FormattedNumber value={strategy.capture_up} format="decimal" /></td>
            </tr>
            <tr>
              <td>Capture down</td>
              <td><FormattedNumber value={underlying.capture_down} format="decimal" /></td>
              <td><FormattedNumber value={strategy.capture_down} format="decimal" /></td>
            </tr>
            <tr>
              <td>Return in 1 year</td>
              <td><FormattedNumber value={underlying.return_1yr} format="decimal" /></td>
              <td><FormattedNumber value={strategy.return_1yr} format="decimal" /></td>
            </tr>
            <tr>
              <td>Return in 3 years</td>
              <td><FormattedNumber value={underlying.return_3yr} format="decimal" /></td>
              <td><FormattedNumber value={strategy.return_3yr} format="decimal" /></td>
            </tr>
            <tr>
              <td>Return in 5 years</td>
              <td><FormattedNumber value={underlying.return_5yr} format="decimal" /></td>
              <td><FormattedNumber value={strategy.return_5yr} format="decimal" /></td>
            </tr>
            <tr>
              <td>Sharpe ratio</td>
              <td><FormattedNumber value={underlying.sharpe_ratio} format="decimal" /></td>
              <td><FormattedNumber value={strategy.sharpe_ratio} format="decimal" /></td>
            </tr>
            <tr>
              <td>Annual volatility</td>
              <td><FormattedNumber value={underlying.annual_volatility} format="decimal" /></td>
              <td><FormattedNumber value={strategy.annual_volatility} format="decimal" /></td>
            </tr>
          </tbody>
        </table>
        <img src={backtestsProvider.getImageURL(plots["2_plot_annual_returns"])} role="presentation" />
        <img src={backtestsProvider.getImageURL(plots["3_plot_monthly_returns_heatmap"])} role="presentation" />
        <img src={backtestsProvider.getImageURL(plots["4_plot_rolling_beta"])} role="presentation" />
        <img src={backtestsProvider.getImageURL(plots["5_plot_outperformance_vs_benchmark"])} role="presentation" />
        <img src={backtestsProvider.getImageURL(plots["6_plot_capture_ratios"])} role="presentation" />
      </div>
    );
  }

}
