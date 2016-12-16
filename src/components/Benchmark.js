import React, { Component, PropTypes } from 'react';
import DataPresenter from './DataPresenter';
import '../styles-local/Benchmark.css';


export default class Benchmark extends Component {

  static propTypes = {
    data: PropTypes.object,
    backtestsProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.inputs = {
      leg_short_call: {},
      leg_long_call: {},
      leg_short_put: {},
      leg_long_put: {}
    };
  }

  run() {
    const { backtestsProvider } = this.props;

    this.setState({...this.state, loading: true});
    backtestsProvider.runBacktest(this.inputs)
      .then(() => this.setState({...this.state, loading: false}))
      .then(() => backtestsProvider.getSavedList());
  }

  skipResults() {
    this.props.backtestsProvider.skipBacktestResult();
  }

  render() {
    const { data, backtestsProvider } = this.props;

    return data ? (
      <section className="benchmark" style={{marginTop: 73}}>
        <DataPresenter data={data.data}
                       plots={data.plots}
                       backtestsProvider={backtestsProvider}
                       title="Benchmark Data" />
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
          <input id="start_date" placeholder="2015-09-01" ref={el => this.inputs.start_date = el} />
        </fieldset>

        <fieldset>
          <label htmlFor="underlying">Underlying:</label>
          <input id="underlying" placeholder="SPY" ref={el => this.inputs.underlying = el} />
        </fieldset>

        <fieldset>
          <h4>Leg short call:</h4>
          <label htmlFor="leg_short_call__oom_amount">Oom amount:</label>
          <input id="leg_short_call__oom_amount" type="number" placeholder="0.01" ref={el => this.inputs.leg_short_call.oom_amount = el} />
          <label htmlFor="leg_short_call__optional_notional_exposure">Optional notional exposure:</label>
          <input id="leg_short_call__optional_notional_exposure" type="number" placeholder="-0.50" ref={el => this.inputs.leg_short_call.optional_notional_exposure = el} />
          <label htmlFor="leg_short_call__tenor_days">Tenor days:</label>
          <input id="leg_short_call__tenor_days" type="number" placeholder="28" ref={el => this.inputs.leg_short_call.tenor_days = el} />
          <label htmlFor="leg_short_call__min_trading_days_expiry">Min trading days expiry:</label>
          <input id="leg_short_call__min_trading_days_expiry" type="number" placeholder="5" ref={el => this.inputs.leg_short_call.min_trading_days_expiry = el} />
          <label htmlFor="leg_short_call__take_profit_threshold">Take profit threshold:</label>
          <input id="leg_short_call__take_profit_threshold" type="number" placeholder="0.5" ref={el => this.inputs.leg_short_call.take_profit_threshold = el} />
          <label htmlFor="leg_short_call__stop_loss_threshold">Stop loss threshold:</label>
          <input id="leg_short_call__stop_loss_threshold" placeholder="-1.00e30" ref={el => this.inputs.leg_short_call.stop_loss_threshold = el} />
        </fieldset>

        <fieldset>
          <h4>Leg long call:</h4>
          <label htmlFor="leg_long_call__oom_amount">Oom amount:</label>
          <input id="leg_long_call__oom_amount" ref={el => this.inputs.leg_long_call.oom_amount = el} />
          <label htmlFor="leg_long_call__optional_notional_exposure">Optional notional exposure:</label>
          <input id="leg_long_call__optional_notional_exposure" ref={el => this.inputs.leg_long_call.optional_notional_exposure = el} />
          <label htmlFor="leg_long_call__tenor_days">Tenor days:</label>
          <input id="leg_long_call__tenor_days" ref={el => this.inputs.leg_long_call.tenor_days = el} />
          <label htmlFor="leg_long_call__min_trading_days_expiry">Min trading days expiry:</label>
          <input id="leg_long_call__min_trading_days_expiry" ref={el => this.inputs.leg_long_call.min_trading_days_expiry = el} />
          <label htmlFor="leg_long_call__take_profit_threshold">Take profit threshold:</label>
          <input id="leg_long_call__take_profit_threshold" ref={el => this.inputs.leg_long_call.take_profit_threshold = el} />
          <label htmlFor="leg_long_call__stop_loss_threshold">Stop loss threshold:</label>
          <input id="leg_long_call__stop_loss_threshold" ref={el => this.inputs.leg_long_call.stop_loss_threshold = el} />
        </fieldset>

        <fieldset>
          <h4>Leg short put:</h4>
          <label htmlFor="leg_short_put__oom_amount">Oom amount:</label>
          <input id="leg_short_put__oom_amount" ref={el => this.inputs.leg_short_put.oom_amount = el} />
          <label htmlFor="leg_short_put__optional_notional_exposure">Optional notional exposure:</label>
          <input id="leg_short_put__optional_notional_exposure" ref={el => this.inputs.leg_short_put.optional_notional_exposure = el} />
          <label htmlFor="leg_short_put__tenor_days">Tenor days:</label>
          <input id="leg_short_put__tenor_days" ref={el => this.inputs.leg_short_put.tenor_days = el} />
          <label htmlFor="leg_short_put__min_trading_days_expiry">Min trading days expiry:</label>
          <input id="leg_short_put__min_trading_days_expiry" ref={el => this.inputs.leg_short_put.min_trading_days_expiry = el} />
          <label htmlFor="leg_short_put__take_profit_threshold">Take profit threshold:</label>
          <input id="leg_short_put__take_profit_threshold" ref={el => this.inputs.leg_short_put.take_profit_threshold = el} />
          <label htmlFor="leg_short_put__stop_loss_threshold">Stop loss threshold:</label>
          <input id="leg_short_put__stop_loss_threshold" ref={el => this.inputs.leg_short_put.stop_loss_threshold = el} />
        </fieldset>

        <fieldset>
          <h4>Leg long put:</h4>
          <label htmlFor="leg_long_put__oom_amount">Oom amount:</label>
          <input id="leg_long_put__oom_amount" ref={el => this.inputs.leg_long_put.oom_amount = el} />
          <label htmlFor="leg_long_put__optional_notional_exposure">Optional notional exposure:</label>
          <input id="leg_long_put__optional_notional_exposure" ref={el => this.inputs.leg_long_put.optional_notional_exposure = el} />
          <label htmlFor="leg_long_put__tenor_days">Tenor days:</label>
          <input id="leg_long_put__tenor_days" ref={el => this.inputs.leg_long_put.tenor_days = el} />
          <label htmlFor="leg_long_put__min_trading_days_expiry">Min trading days expiry:</label>
          <input id="leg_long_put__min_trading_days_expiry" ref={el => this.inputs.leg_long_put.min_trading_days_expiry = el} />
          <label htmlFor="leg_long_put__take_profit_threshold">Take profit threshold:</label>
          <input id="leg_long_put__take_profit_threshold" ref={el => this.inputs.leg_long_put.take_profit_threshold = el} />
          <label htmlFor="leg_long_put__stop_loss_threshold">Stop loss threshold:</label>
          <input id="leg_long_put__stop_loss_threshold" ref={el => this.inputs.leg_long_put.stop_loss_threshold = el} />
        </fieldset>

        <button className="btn btn-title btn-primary benchmark-run-btn" onClick={this.run.bind(this)}>Run Backtest</button>
      </section>
    );
  }

}