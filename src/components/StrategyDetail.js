import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ChartReturnsCumulative from './chart-returns-cumulative';
import config from '../config';

class StrategyDetail extends Component {

  getChildContext() {
    return {
      config,
    };
  }

  render() {
    const {model, returns, showBasis, basisReturns} = this.props;

    return (
      <div className="strategy-detail">
        <h3>{model}</h3>
        <ChartReturnsCumulative
          id="returnsChart"
          data={returns}
          value={config.strategy.value}
          style={{height: '30em'}}
        />

        { showBasis && basisReturns.length ? (
          <div className="m-t-3">
            <h3>VIX vs VXX</h3>
            <ChartReturnsCumulative
              id = "basisReturnsChart"
              data={basisReturns}
              value={config.strategy.value}
              style={{height: '30em'}}
            />
          </div>
          ) : false
        }

        <Link to="/performance" className="btn btn-primary btn-black btn-title m-t-2">Back to performance</Link>
      </div>
    );
  }

}

StrategyDetail.propTypes = {
  showBasis: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  returns: PropTypes.array.isRequired,
  basisReturns: PropTypes.array,
};

StrategyDetail.childContextTypes = {
  config: PropTypes.object.isRequired,
};


export default StrategyDetail;