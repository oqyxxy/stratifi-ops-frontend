import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {DateField, DatePicker} from 'react-date-picker';
import {FormattedNumber} from 'react-intl';
import 'react-date-picker/index.css';
import ChartReturnsCumulative from './chart-returns-cumulative';
import ChartBarReturns from './chart-bar-returns';
import config from '../config';

class StrategyDetail extends Component {

  static propTypes = {
    showBasis: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    basisReturns: PropTypes.array,
    fields: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    config: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      config,
    };
  }

  render() {
    const {data, showBasis, basisReturns, fields} = this.props;

    return (
      <div className="strategy-detail">
        <h3>{data.strategyName}</h3>

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

        <div className="metrics m-t-2">
          <h4>Metrics</h4>
          <div style={{overflowX: 'auto'}}>
            <table className="table table-bordered table-borderless-top">
              <thead className="thead-graphite">
                <tr>
                  <th>Strategy</th>
                  {
                    Object.keys(config.metrics.labels).map((key, i) =>
                      <th>{config.metrics.labels[key]}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
              {
                data.metrics.map((strategy, index) => (
                  <tr key={index}>
                    <td>{index === 0 ? 'Benchmark' : data.strategyName}</td>
                    {
                      Object.keys(config.metrics.labels).map((key, i) =>
                        <td key={i}><FormattedNumber value={strategy[key]} format="percent" /></td>
                      )
                    }
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>

        <div className="cumulative-chart m-t-2">
          <h4>Cumulative Returns</h4>

          <div className="container row m-t-1 m-b-2">
            <div className="col-md-6 col-md-bordered p-y-1 text-xs-center">
              <div>
                <small>
                  <hr className="hr-dash hr-primary-muted m-r-1" />
                  Benchmark
                </small>
              </div>
            </div>
            <div className="col-md-6 col-md-bordered p-y-1 text-xs-center">
              <div>
                <small>
                  <hr className="hr-dash hr-primary m-r-1" />
                  {data.strategyName}
                </small>
              </div>
            </div>
          </div>

          <ChartReturnsCumulative
            id="returnsChart"
            data={data.returnsCumulative}
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
            data={data.returns}
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

export default StrategyDetail;
