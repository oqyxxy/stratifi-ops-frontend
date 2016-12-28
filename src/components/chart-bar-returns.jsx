import React, { Component, PropTypes } from 'react';

import { FormattedNumber } from 'react-intl';
import clone from 'clone';
import deepAssign from 'deep-assign';

const _array = [], _object = {};
import Chart from './chart';

class ChartBarReturns extends Chart {

 className = 'chart-returns chart-bar-returns';

  getOptions() {
    const themes = this.context.config.chart;

    const options = deepAssign({},
      clone(themes.common.default, false),
      clone(themes.serial.default, false),
      clone(themes.serial.timeseries, false),
      clone(themes.serial.returnsBarchart, false),
      clone(this.props.options, false),
    );

    return options;
  }

  getData(options, newProps) {
    const themes = this.context.config.chart;
    const props = newProps || this.props;
    const value = props.value || 0;
    let multiplier = 1;

    if (options.valueAxes && options.valueAxes[0]) {
      multiplier = options.valueAxes[0].unit == '%' ? 100 : 1;
    }

    // recalculate "fractions" to "absolute" values
    const data = props.data.map(item => {
      var newItem = clone(item, false);

      themes.serial.returnsCumulative.graphs.forEach(graph => {
        if ([null, undefined].indexOf(item[graph.valueField]) === -1) {
          newItem[graph.valueField] = item[graph.valueField] * multiplier;
        }
      });

      return newItem;
    });

    return data;
  }
}

ChartBarReturns.contextTypes = {
  config: PropTypes.object.isRequired,
};

ChartBarReturns.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
};

export default ChartBarReturns;
