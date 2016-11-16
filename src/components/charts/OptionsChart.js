import { PropTypes } from 'react';
import { CHART_THEMES } from '../../constants/rendering';
import Chart from './base/Chart';


export default class OptionsChart extends Chart {

  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,

    data: PropTypes.array.isRequired,
    options: PropTypes.object,
    listeners: PropTypes.array,
  };

  getOptions() {

    return {
      ...CHART_THEMES.common.default,
      ...CHART_THEMES.serial.default,
      ...CHART_THEMES.serial.timeseries,
      ...CHART_THEMES.serial.optionsChart
    };
  }

  getData(options, newProps) {
    const rawData = super.getData(options, newProps);
    return rawData;
  }

}
