import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DataPresenter from './DataPresenter';


export default class Previous extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    selectedName: PropTypes.string,
    backtestsProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  loadingOn() {
    this.setState({ ...this.state, loading: true });
  }

  loadingOff() {
    this.setState({ ...this.state, loading: false });
  }

  selectOldBacktest(event) {
    const value = event.target.value;
    this.loadingOn();
    this.props.backtestsProvider.getSavedObject(value).then(() => this.loadingOff());
  }

  render() {
    const { list, data, backtestsProvider, selectedName } = this.props;

    return (
      <section>
        <div className="c-select-wrap">
          <select defaultValue={selectedName || ""} className="form-control c-select" onChange={this.selectOldBacktest.bind(this)}>
            <option value="" disabled>Select old backtest</option>
            {
              list.map(item => <option value={item} key={item}>{item}</option>)
            }
          </select>
        </div>
        {
          this.state.loading ? (
            <div>Loading...</div>
          ) : (
            data.data && data.plots && <DataPresenter backtestsProvider={backtestsProvider}
                                                      title={selectedName}
                                                      data={data.data}
                                                      plots={data.plots} />
          )
        }
        <div className="m-t-3">
          <Link to="/" className="btn btn-primary btn-title btn-black">Back to dashboard</Link>
        </div>
      </section>
    );
  }

}
