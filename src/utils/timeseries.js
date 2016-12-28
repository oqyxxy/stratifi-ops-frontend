import clone from 'clone';
import moment from 'moment';

const _array = [], _object = {};

export function analyzeProxies(timeseries, dateStart, dateEnd, dateInception) {
  /*
    Analyze returns for multiple portfolios and specific period:
    - create normalized returns timeseries
    - also create cumulative returns timeseries
    - also create downside returns timeseries
    - also create returns matrix
    - add analytics (total return and so on)

    @timeseries: list of returns lists (returns: [[$timestamp,$value], ...])
    @dateStart: just a date (optional)
    @dateEnd: just a date (reserved/optional)
  */

  let data;
  dateStart = dateStart || new Date(1970);
  dateEnd = dateEnd || Date.now();
  dateInception = dateInception || new Date(2050);

  // pre-filtered dates/timestamps
  // (limit to selected period)
  let dates = (timeseries[0] || _array)
    .filter(item => {
      return item[0] && item[0] > dateStart; // && item[0] < dateStart
    })
    .map(item => {
      return item[0];
    })

  // combine times series
  let values = {};
  timeseries.forEach((item, index) => {
    item = item || _array;

    // no slow forEachs here
    for (let i = 0; i < item.length; i++) {
      let ts = item[i][0]; // timestamp

      if (dates.indexOf(ts) > -1) {
        values[ts] = values[ts] || {date: ts};
        values[ts][index] = item[i][1]; // value
        values[ts]['count'] = (values[ts]['count'] || 0) + 1;
      }
    };
  });

  // filtered dates/timestamps
  // (drop "incompleted" values)
  dates = dates.filter(item => {
    return values[item] && values[item]['count'] == timeseries.length;
  });

  // create filetered combined returns timeseries
  let returns = dates.map(item => {
    let value = values[item];

    value.date = value.date * 1000; // convert to millisecond timestamps
    delete value.count;

    // TODO: try to remove it from here (everything concerning styling should be in chart options)
    value.dashLength = value.date <= dateInception.valueOf() ? 2 : 0;

    return value;
  });

  // create cumulative returns timeseries
  data = clone(returns);
  let returnsCumulative = data;

  // add one more "default" point
  data.length && data.unshift({
    date: moment(data[0].date).startOf('month').valueOf(), // origin dates are supposed to be "end of month"
  });

  for (let i = 0; i < data.length; i++) {
    for (let index = 0; index < timeseries.length; index++) {
      data[i][index] = i ? (1 + data[i - 1][index]) * (1 + data[i][index]) - 1 : 0;
    }
  }

  // create downside returns timeseries
  data = clone(returnsCumulative);
  let returnsDownside = data;

  for (let i = 0, max = 0; i < data.length; i++) {
    for (let index = 0; index < timeseries.length; index++) {
      max = Math.max(max, data[i][index]);
      data[i][index] = Math.min(data[i][index] - max, 0);
    }
  }

  // create returns matrix (for annual/monthly table view)
  let returnsMatrix = [[]];

  if (returns.length) {
    data = clone(returns);
    const startDate= new Date(data[0].date);
    const endDate= new Date(data[data.length - 1].date);

    for (var i = 0; i < data.length; i++) {
      let dt = new Date(data[i].date);
      i && !dt.getMonth() && returnsMatrix.push([]); // add year array
      returnsMatrix[returnsMatrix.length - 1].push(data[i]); // add month value
    }

    // add empty values at the beginning and the end (getMonth starts from zero)
    for (var i = 0; i < startDate.getMonth(); i++) { returnsMatrix[0].unshift({}); }
    for (var i = 0; i < 11 - endDate.getMonth(); i++) { returnsMatrix[returnsMatrix.length - 1].push({}); }
  }

  // get timeseries indexes for periods: 0yrs, 1yr, 3yrs, 5yrs...
  let returnsCumulativeTotal = [0, 1, 3, 5].map(years => {
    let periodStart = moment().subtract(years, 'year')
    return returnsCumulative.reduce((previousValue, currentValue) =>
      currentValue['date'] < periodStart.format('x') ? currentValue : previousValue, {}) // convert to milliseconds
  }) || [];

  // add basic analytics
  // (yes, "backend" naming conventions here)
  let analytics = timeseries.map((item, index) => {
    const total_return = (returnsCumulativeTotal[0] || {})[index] || 0;

    return {
      total_return: total_return,
      total_1yr_return: total_return - ((returnsCumulativeTotal[1] || {})[index] || 0),
      total_3yr_return: total_return - ((returnsCumulativeTotal[2] || {})[index] || 0),
      total_5yr_return: total_return - ((returnsCumulativeTotal[3] || {})[index] || 0),
      // OBSOLETED // total_return: returnsCumulative.length ? returnsCumulative[returnsCumulative.length - 1][index] : 0,
    }
  });

  return {
    returns: returns,
    returnsCumulative: returnsCumulative,
    returnsDownside: returnsDownside,
    returnsMatrix: returnsMatrix,
    analytics: analytics,
  }
}