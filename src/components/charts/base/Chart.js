import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class Chart extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,

    data: PropTypes.array.isRequired,
    options: PropTypes.object,
    listeners: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;

    const options = this.getOptions();
    const listeners = this.getListeners();
    const data =this.getData(options);

    const config = Object.assign({}, options, {dataProvider: data});

    // set chart
    const chart = window.AmCharts.makeChart(id, config);
    this._chart = chart;

    // set chart event listeners
    for (let prop in listeners) {
      if (!listeners.hasOwnProperty(prop)) continue;
      chart.addListener(prop, listeners[prop]);
    }

    // set chart guides
    this.renderGuides(options, this.props);
  }

  componentWillReceiveProps(newProps) {
    const options = this.getOptions();

    this._chart.dataProvider = this.getData(options, newProps);
    this._chart.validateNow();

    this.renderGuides(options, newProps);
  }

  getData(options, newProps) {
    const props = newProps || this.props;
    return props.data;
  }

  getGuides(options, newProps) {
    // Experimental
    const guides = newProps.guides || [];
    return guides;
  }

  getOptions() {
    return Object.assign({}, this.props.options);
  }

  getListeners() {
    return  Object.assign({}, this.props.listeners);
  }

  render() {
    let { id, style } = this.props;
    const className = 'chart ' + (this.className || '') + ' ' + (this.props.className || '');
    style = style || { height: 450 };

    return (
      <div id={id} className={className} style={style}></div>
    );
  }

  renderGuides(options, newProps) {
    if (this._chart.categoryAxis) {
      this._chart.categoryAxis.guides = this.getGuides(options, newProps);
      this._chart.validateNow();
    }
  }
}
