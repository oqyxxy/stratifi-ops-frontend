const keysAreIndexes = keys => {
  for (let k of keys) if (Number.isNaN(Number.parseInt(k))) return false;
  return true;
};

const normalizeErrors = obj => {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (typeof obj[key] !== 'object') continue;
    const keys = Object.keys(obj[key]);
    if (keysAreIndexes(keys)) {
      const oldObj = obj[key];
      obj[key] = [];
      for (let k of keys) {
        const value = oldObj[k];
        obj[key][Number.parseInt(k)] = value;
        if (typeof value === 'object') normalizeErrors(value);
      }
    } else {
      for (let k of keys) if (typeof obj[k] === 'object') normalizeErrors(obj[k]);
    }
  }
};

export default normalizeErrors;
