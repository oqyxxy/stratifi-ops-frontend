import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import StrategyDetail from '../components/StrategyDetail';
import ModelsProvider from '../providers/models';


class StrategyDetailContainer extends Component {

  static propTypes = {
    model: PropTypes.object,
    basisModel: PropTypes.object,
    modelsProvider: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {params, location} = this.props;

    if (location.query && +location.query.basis) {
      this.props.modelsProvider.getBasisObject();
    }

    this.props.modelsProvider.getObject(params.id);
  }

  componentWillUnmount() {
    this.props.modelsProvider.clearObject();
  }

  prepareReturns() {
    const {model} = this.props;
    let returns = [];
    let strategyModel = '';

    if (model && model.data) {
      const modelItem = model.data.items[0];
      const data = JSON.parse(modelItem.json);
      strategyModel = modelItem.model;

      returns = data.strategy.returns.map(item => ({
        date: new Date(item[0]),
        1: item[1]
      }));
    }

    return {returns, strategyModel};
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
    const {location} = this.props;
    const {strategyModel, returns} = this.prepareReturns();
    const basisReturns = this.prepareBasisReturns();

    return (
      <div className="strategy-detail-container container">
        <div className="m-b-3">
          {returns.length ?
            <StrategyDetail
              showBasis={location.query && Boolean(+location.query.basis)}
              model={strategyModel}
              basisReturns={basisReturns}
              returns={returns}
            /> : false
          }
        </div>
      </div>
    );
  }

}


export default connect(
  state => ({
    model: state.models.object,
    basisModel: state.models.basisObject,
  }),
  dispatch => ({
    modelsProvider: new ModelsProvider(dispatch),
  })
)(StrategyDetailContainer);
