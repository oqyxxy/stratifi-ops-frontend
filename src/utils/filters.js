export const toDateString = isoDateString => {
  return new Date(isoDateString).toLocaleDateString();
};