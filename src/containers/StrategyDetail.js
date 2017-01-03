import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import moment from 'moment';
import ModelsProvider from '../providers/models';
import StrategyDetail from '../components/StrategyDetail';


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

    withModel && this.props.modelsProvider.getObject(params.id);
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
    const {location, fields, model} = this.props;
    const data = ModelsProvider.prepareData(model, fields.startDate.value, fields.endDate.value);
    const basisReturns = this.prepareBasisReturns();

    return (
      <div className="strategy-detail-container container">
        <div className="m-b-3">
          <StrategyDetail
            data={data}
            fields={fields}
            showBasis={location.query && Boolean(+location.query.basis)}
            basisReturns={basisReturns}
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
