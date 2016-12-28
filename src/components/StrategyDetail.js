import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {DateField, DatePicker} from 'react-date-picker';
import 'react-date-picker/index.css';
import ChartReturnsCumulative from './chart-returns-cumulative';
import ChartBarReturns from './chart-bar-returns';
import config from '../config';

class StrategyDetail extends Component {

  getChildContext() {
    return {
      config,
    };
  }

  render() {
    const {model, returns, returnsCumulative, showBasis, basisReturns, fields} = this.props;

    return (
      <div className="strategy-detail">
        <h3>{model}</h3>

        <div className="form-inline">
          <div className="form-group">
            <label>Start Date: </label>
            <DateField
              {...fields.startDate}
              placeholder="YYYY-MM-DD"
              dateFormat="YYYY-MM-DD"
              forceValidDate
              updateOnDateClick={true}
              collapseOnDateClick={true}>

              <DatePicker
                navigation={true}
                locale="en"
                highlightWeekends={false}
                highlightToday={true}
                weekNumbers={false}
                footer={false}
              />

            </DateField>
          </div>

          <div className="form-group m-l-1">
            <label>End Date: </label>
            <DateField
              {...fields.endDate}
              placeholder="YYYY-MM-DD"
              dateFormat="YYYY-MM-DD"
              forceValidDate
              updateOnDateClick={true}
              collapseOnDateClick={true}>

              <DatePicker
                navigation={true}
                locale="en"
                highlightWeekends={false}
                highlightToday={true}
                weekNumbers={false}
                footer={false}
              />

            </DateField>
          </div>
        </div>

        <div className="cumulative-chart m-t-2">
          <h4>Cumulative Returns</h4>
          <ChartReturnsCumulative
            id="returnsChart"
            data={returnsCumulative}
            value={config.strategy.value}
            style={{height: '30em'}}
            options={{
              graphs: [{fillAlphas: 0}],
              valueAxes: [{unit: '%', unitPosition: 'right'}]
            }}
          />
        </div>

        <div className="returns-barchart m-t-3">
          <h4>Returns</h4>
          <ChartBarReturns
            id="returnsBarChart"
            data={returns}
            value={config.strategy.value}
            style={{height: '30em'}}
            options={{
              valueAxes: [{unit: '%', unitPosition: 'right'}]
            }}
          />
        </div>

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
  returnsCumulative: PropTypes.array.isRequired,
  basisReturns: PropTypes.array,
  fields: PropTypes.object.isRequired,
};

StrategyDetail.childContextTypes = {
  config: PropTypes.object.isRequired,
};

export default StrategyDetail;
