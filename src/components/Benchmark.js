import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import DataPresenter from './DataPresenter';
import LegFieldset from './LegFieldset';
import Input from './form/Input';
import '../styles-local/Benchmark.css';


class Benchmark extends Component {

  static propTypes = {
    data: PropTypes.object,
    backtestsProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  run(values) {
    console.log(values);
    const { backtestsProvider } = this.props;

    this.setState({...this.state, loading: true});
    backtestsProvider.runBacktest(values)
      .then(() => this.setState({...this.state, loading: false}))
      .then(() => backtestsProvider.getSavedList());
  }

  skipResults() {
    this.props.backtestsProvider.skipBacktestResult();
  }

  render() {
    const { data, backtestsProvider, fields, handleSubmit } = this.props;

    return data ? (
      <section className="benchmark" style={{marginTop: 30}}>
        <DataPresenter data={data.data}
                       plots={data.plots}
                       underlyingSymbol={data.underlying_symbol}
                       backtestsProvider={backtestsProvider}
                       title="Backtest Report" />
        <button className="btn btn-title btn-primary" onClick={this.skipResults.bind(this)}>Run with other parameters</button>
      </section>
    ) : this.state.loading ? (
      <section>
        <h4 style={{textAlign: 'center'}}>Loading...</h4>
      </section>
    ) : (
      <section className="benchmark">
        <fieldset>
          <label htmlFor="start_date">Start date:</label>
          <Input id="start_date" {...fields.start_date} placeholder="2015-09-01" />
        </fieldset>

        <fieldset>
          <label htmlFor="underlying">Underlying:</label>
          <Input id="underlying" {...fields.underlying} placeholder="SPY" />
        </fieldset>

        <LegFieldset fields={fields.leg_short_call} placeholders={{
          oom_amount: 0.01,
          optional_notional_exposure: -0.50,
          tenor_days: 28,
          min_trading_days_expiry: 5,
          take_profit_threshold: 0.5,
          stop_loss_threshold: -100
        }} title="Leg short call" />
        <LegFieldset fields={fields.leg_long_call} placeholders={{
          oom_amount: 0.05,
          optional_notional_exposure: -0.50,
          tenor_days: 28,
          min_trading_days_expiry: 5,
          take_profit_threshold: 3.0,
          stop_loss_threshold: -100
        }} title="Leg long call" />
        <LegFieldset fields={fields.leg_short_put} placeholders={{
          oom_amount: -0.03,
          optional_notional_exposure: -0.33,
          tenor_days: 28,
          min_trading_days_expiry: 5,
          take_profit_threshold: 0.5,
          stop_loss_threshold: -100
        }} title="Leg short put" />
        <LegFieldset fields={fields.leg_long_put} placeholders={{
          oom_amount: -0.05,
          optional_notional_exposure: 0.50,
          tenor_days: 28 * 6,
          min_trading_days_expiry: 28 * 3,
          take_profit_threshold: 0.5,
          stop_loss_threshold: -0.80
        }} title="Leg long put" />

        <button className="btn btn-title btn-primary benchmark-run-btn" onClick={handleSubmit(this.run.bind(this))}>Run Backtest</button>
      </section>
    );
  }

}


export default reduxForm({
  form: 'backtest',
  fields: [
    'start_date',
    'underlying',
    'leg_short_call.oom_amount',
    'leg_short_call.optional_notional_exposure',
    'leg_short_call.tenor_days',
    'leg_short_call.min_trading_days_expiry',
    'leg_short_call.take_profit_threshold',
    'leg_short_call.stop_loss_threshold',
    'leg_long_call.oom_amount',
    'leg_long_call.optional_notional_exposure',
    'leg_long_call.tenor_days',
    'leg_long_call.min_trading_days_expiry',
    'leg_long_call.take_profit_threshold',
    'leg_long_call.stop_loss_threshold',
    'leg_short_put.oom_amount',
    'leg_short_put.optional_notional_exposure',
    'leg_short_put.tenor_days',
    'leg_short_put.min_trading_days_expiry',
    'leg_short_put.take_profit_threshold',
    'leg_short_put.stop_loss_threshold',
    'leg_long_put.oom_amount',
    'leg_long_put.optional_notional_exposure',
    'leg_long_put.tenor_days',
    'leg_long_put.min_trading_days_expiry',
    'leg_long_put.take_profit_threshold',
    'leg_long_put.stop_loss_threshold',
  ]
})(Benchmark);
