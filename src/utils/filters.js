export const toDateString = isoDateString => {
  return new Date(isoDateString).toLocaleDateString();
};


export const getSpreadStatus = spread => {
  let executedNumber = 0;
  let cancelledNumber = 0;

  for (let order of spread.orders) {
    switch (order.status) {
      case 'Pending':
        return 'Pending';
      case 'Executed':
        ++executedNumber;
        break;
      case 'Cancelled':
        ++cancelledNumber;
        break;
      default:
        throw new Error('Unsupported order status');
    }
  }

  if (executedNumber === spread.orders.length) return 'Executed';
  if (cancelledNumber === spread.orders.length) return 'Cancelled';
};


export const getSpreadPrice = spread => {
  return spread.orders.reduce((prevVal, nextVal) => prevVal + nextVal.target_price, 0);
};


export const getDateFieldProps = props => {
  const { value, className, checked, name, onBlur, onChange, onDragStart, onDrop, onFocus, type, placeholder } = props;
  return { value, className, checked, name, onBlur, onChange, onDragStart, onDrop, onFocus, type, placeholder };
};
