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
    const {params} = this.props;

    if (params.id == 'basis-strategy') {
      this.props.modelsProvider.getBasisObject();
    } else {
      this.props.modelsProvider.getObject(params.id);
    }
  }

  componentWillUnmount() {
    this.props.modelsProvider.clearObject();
  }

  render() {
    const {model, basisModel, params} = this.props;
    let returns = [];
    let strategyModel = '';

    if (params.id == 'basis-strategy' && basisModel && basisModel.data) {
      const basisModelData = basisModel.data.items[0].data;
      strategyModel = 'VIX vs VXX';
      returns = Object.assign([]);

      Object.keys(basisModelData.t_date).forEach(key => {
        returns.push({
          date: new Date(basisModelData.t_date[key]),
          0: basisModelData.price_close_ini[key],
        });
      });
    } else if (model && model.data) {
      const modelItem = model.data.items[0];
      const data = JSON.parse(modelItem.json);
      strategyModel = modelItem.model;

      returns = data.strategy.returns.map(item => ({
        date: new Date(item[0]),
        0: item[1]
      }));
    }

    return (
      <div className="strategy-detail-container container">
        <div className="m-b-3">
          {returns.length ?
            <StrategyDetail
              model={strategyModel}
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
