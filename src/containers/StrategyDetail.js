import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import moment from 'moment';
import {analyzeProxies} from '../utils/timeseries';
import StrategyDetail from '../components/StrategyDetail';
import ModelsProvider from '../providers/models';


class StrategyDetailContainer extends Component {

  static propTypes = {
    model: PropTypes.object,
    basisModel: PropTypes.object,
    modelsProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const {fields:{startDate, endDate}} = this.props;

    this.fetchData(startDate, endDate, true);
  }

  componentWillUnmount() {
    this.props.modelsProvider.clearObject();
  }

  componentWillReceiveProps(nextProps) {
    const {fields:{startDate, endDate}} = this.props;
    const {fields:{startDate: nextStartDate, endDate: nextEndDate}} = nextProps;

    if (nextStartDate.value !== startDate.value || nextEndDate.value !== endDate.value) {
      this.fetchData(nextStartDate, nextEndDate);
    }
  }

  fetchData(startDate, endDate, withModel) {
    const {params, location} = this.props;
    const queryParams = {
      start_date: startDate.value,
      end_date: endDate.value,
    };

    if (location.query && +location.query.basis) {
      this.props.modelsProvider.getBasisObject(Object.assign({}, queryParams, {
        token: 'WyIyIiwiNjU4ZGMyZjA5ZGJiNGRkMzZkMTNjZmMzNjBlMTk5ZTEiXQ',
        ticker1: 'VXX',
        ticker2: 'VIX',
      }));
    }

    withModel && this.props.modelsProvider.getObject(params.id, queryParams);
  }

  prepareReturns() {
    const {model, fields: {startDate, endDate}} = this.props;
    let returns = [];
    let returnsCumulative= [];
    let strategyModel = '';

    if (model && model.data) {
      const modelItem = model.data.items[0];
      const data = JSON.parse(modelItem.json);
      const startDateUnix = moment(startDate.value).unix();
      const endDateUnix = moment(endDate.value).unix();
      const preparedReturns = data.strategy.returns
        .filter(item => {
          const date = moment(item[0]).unix();
          return date >= startDateUnix && date <= endDateUnix;
        })
        .map(item => ([moment(item[0]).unix(), item[1]]));
      const preparedData = analyzeProxies([preparedReturns], startDateUnix, endDateUnix);


      strategyModel = modelItem.model;
      returns = preparedData.returns;
      returnsCumulative = preparedData.returnsCumulative;
    }

    return {returns, returnsCumulative, strategyModel};
  }

  prepareBasisReturns() {
    const {basisModel, location: {query}} = this.props;
    let basisReturns = [];

    if (query && +query.basis && basisModel && basisModel.data) {
      const basisModelData = basisModel.data.items[0].data;

      Object.keys(basisModelData.t_date).forEach(key => {
        basisReturns.push({
          date: new Date(basisModelData.t_date[key]),
          1: basisModelData.price_close_ini[key],
        });
      });
    }

    return basisReturns;
  }

  render() {
    const {location, fields} = this.props;
    const {strategyModel, returns, returnsCumulative} = this.prepareReturns();
    const basisReturns = this.prepareBasisReturns();

    return (
      <div className="strategy-detail-container container">
        <div className="m-b-3">
          <StrategyDetail
            fields={fields}
            showBasis={location.query && Boolean(+location.query.basis)}
            model={strategyModel}
            basisReturns={basisReturns}
            returns={returns}
            returnsCumulative={returnsCumulative}
          />
        </div>
      </div>
    );
  }

}


StrategyDetailContainer = reduxForm({
  form: 'strategyDetail',
  fields: [
    'startDate',
    'endDate',
  ],
  initialValues: {
    startDate: moment().subtract(6, 'month').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  }
})(StrategyDetailContainer);

export default connect(
  state => ({
    model: state.models.object,
    basisModel: state.models.basisObject,
  }),
  dispatch => ({
    modelsProvider: new ModelsProvider(dispatch),
  })
)(StrategyDetailContainer);
