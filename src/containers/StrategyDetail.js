import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import StrategyDetail from '../components/StrategyDetail';
import ModelsProvider from '../providers/models';


class StrategyDetailContainer extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    modelsProvider: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {params} = this.props;

    this.props.modelsProvider.getObject(params.id);
  }

  render() {
    const {model} = this.props;
    let data = {};
    let strategyModel = '';

    if (model && model.data) {
      const modelItem = model.data.items[0];
      strategyModel = modelItem.model;
      data = JSON.parse(model.data.items[0].json);
    }

    return (
      <div className="strategy-detail-container container">
        <div className="m-b-3">
          <StrategyDetail
            model={strategyModel}
            data={data}
          />
        </div>
      </div>
    );
  }

}


export default connect(
  state => ({
    model: state.models.object,
  }),
  dispatch => ({
    modelsProvider: new ModelsProvider(dispatch),
  })
)(StrategyDetailContainer);
