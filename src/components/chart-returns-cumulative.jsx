import React, { Component, PropTypes } from 'react';

import { FormattedNumber } from 'react-intl';
import clone from 'clone';

const _array = [], _object = {};
import Chart from './chart';

class ChartReturnsCumulative extends Chart {

 className = 'chart-returns chart-returns-cumulative';

  getOptions() {
    const themes = this.context.config.chart;

    const options = Object.assign({},
      clone(themes.common.default, false),
      clone(themes.serial.default, false),
      clone(themes.serial.timeseries, false),
      clone(themes.serial.returnsCumulative, false),
      this.props.options,
    );

    // extra very custom settings
    options.valueAxes[0].unit = '%';
    options.valueAxes[0].unitPosition = 'left';

    return options;
  }

  getData(options, newProps) {
    const themes = this.context.config.chart;
    const props = newProps || this.props;
    const value = props.value || 0;

    // recalculate "fractions" to "absolute" values
    const data = props.data.map(item => {
      var newItem = clone(item, false);

      themes.serial.returnsCumulative.graphs.forEach(graph => {
        if (item[graph.valueField] !== undefined) { newItem[graph.valueField] = item[graph.valueField]; }
      });

      return newItem;
    });

    return data;
  }
}

ChartReturnsCumulative.contextTypes = {
  config: PropTypes.object.isRequired,
}

ChartReturnsCumulative.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
}

export default ChartReturnsCumulative;
