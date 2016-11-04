const _regex = {
  intPositive: /^\d+$/,
  floatPositive: /^\d+.?[\d+]?/,
};

const _test_pattern = (value, pattern, errorMessage) => {
  let val = value ? '' + value : '';
  if (!val.match(pattern)) return errorMessage;
};


const validation = {

  required(value) {
    if (value === false || value === 0) return;
    if (!value) return 'Required';
  },

  includes(collection, item, attr, errorMessage = 'No matching item') {
    if (!collection.find(i => i[attr] === item[attr])) return errorMessage;
  },

  intPositive(value) {
    return _test_pattern(value, _regex.intPositive, 'Invalid positive number');
  },

  floatPositive(value) {
    return _test_pattern(value, _regex.floatPositive, 'Invalid positive float number');
  }

};


export default validation;
