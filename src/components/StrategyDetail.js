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
    const {model, data} = this.props;
    let returnsCumulative = [];

    if (data.strategy) {
      returnsCumulative = data.strategy.returns.map(item => ({
        date: +new Date(item[0]),
        0: item[1]
      }));
    }

    return (
      <div className="strategy-detail">
        <h3>{model}</h3>

        { data.strategy ?
          <ChartReturnsCumulative
            id="returnsChart"
            data={returnsCumulative}
            value={config.strategy.value}
            style={{height: '30em'}}
          /> :
          <p>There is no data for this strategy yet</p>
        }

        <Link to="/performance" className="btn btn-primary btn-black btn-title m-t-2">Back to performance</Link>
      </div>
    );
  }

}

StrategyDetail.propTypes = {
  model: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

StrategyDetail.childContextTypes = {
  config: PropTypes.object.isRequired,
};


export default StrategyDetail;