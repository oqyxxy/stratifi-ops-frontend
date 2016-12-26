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
    const {model, returns} = this.props;

    return (
      <div className="strategy-detail">
        <h3>{model}</h3>
        <ChartReturnsCumulative
          id="returnsChart"
          data={returns}
          value={config.strategy.value}
          style={{height: '30em'}}
        />

        <Link to="/performance" className="btn btn-primary btn-black btn-title m-t-2">Back to performance</Link>
      </div>
    );
  }

}

StrategyDetail.propTypes = {
  model: PropTypes.string.isRequired,
  returns: PropTypes.array.isRequired,
};

StrategyDetail.childContextTypes = {
  config: PropTypes.object.isRequired,
};


export default StrategyDetail;