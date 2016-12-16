import React, { Component, PropTypes } from 'react';
import '../styles-local/DataPresenter.css';


export default class DataPresenter extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    plots: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    backtestsProvider: PropTypes.object.isRequired
  };

  render() {
    const { title, data, plots, backtestsProvider } = this.props;
    const { SPY: spy, Strategy: strategy } = data;

    return (
      <div className="data-presenter">
        <h5>{title}</h5>
        <img src={backtestsProvider.getImageURL(plots["1_plot_portfolio_values"])} role="presentation" />
        <table className="table table-bordered table-borderless-top">
          <thead className="thead-graphite">
            <tr>
              <th>Parameter</th>
              <th>SPY</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total return</td>
              <td>{spy.total_return}</td>
              <td>{strategy.total_return}</td>
            </tr>
            <tr>
              <td>Max dd months to recover</td>
              <td>{spy.max_dd_months_to_recover}</td>
              <td>{strategy.max_dd_months_to_recover}</td>
            </tr>
            <tr>
              <td>Max drawdown</td>
              <td>{spy.max_drawdown}</td>
              <td>{strategy.max_drawdown}</td>
            </tr>
            <tr>
              <td>Annual return</td>
              <td>{spy.annual_return}</td>
              <td>{strategy.annual_return}</td>
            </tr>
            <tr>
              <td>Capture up</td>
              <td>{spy.capture_up}</td>
              <td>{strategy.capture_up}</td>
            </tr>
            <tr>
              <td>Capture down</td>
              <td>{spy.capture_down}</td>
              <td>{strategy.capture_down}</td>
            </tr>
            <tr>
              <td>Return in 1 year</td>
              <td>{spy.return_1yr}</td>
              <td>{strategy.return_1yr}</td>
            </tr>
            <tr>
              <td>Return in 3 years</td>
              <td>{spy.return_3yr}</td>
              <td>{strategy.return_3yr}</td>
            </tr>
            <tr>
              <td>Return in 5 years</td>
              <td>{spy.return_5yr}</td>
              <td>{strategy.return_5yr}</td>
            </tr>
            <tr>
              <td>Sharpe ratio</td>
              <td>{spy.sharpe_ratio}</td>
              <td>{strategy.sharpe_ratio}</td>
            </tr>
            <tr>
              <td>Annual volatility</td>
              <td>{spy.annual_volatility}</td>
              <td>{strategy.annual_volatility}</td>
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
