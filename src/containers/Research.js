import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BacktestsProvider from '../providers/backtests';
import Previous from '../components/Previous';
import Benchmark from '../components/Benchmark';
import '../styles-local/Research.css';


class Research extends Component {

  static propTypes = {
    backtests: PropTypes.object.isRequired,
    backtestsProvider: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.backtestsProvider.getSavedList();
  }

  render() {
    const { backtests, backtestsProvider } = this.props;

    return (
      <div className="data-presentation">
        <Previous list={backtests.list}
                  data={backtests.object}
                  backtestsProvider={backtestsProvider}
                  selectedName={backtests.name} />
        <Benchmark data={backtests.runResult} backtestsProvider={backtestsProvider} />
      </div>
    );
  }

}


export default connect(
  state => ({
    backtests: state.backtests
  }),
  dispatch => ({
    backtestsProvider: new BacktestsProvider(dispatch)
  })
)(Research);
