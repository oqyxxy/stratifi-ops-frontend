import React from 'react';


const Input = props => {

  const { value, error, className } = props;
  const classes = (className || '')
                  + (value ? ' has-value' : '')
                  + (error ? ' form-control-danger' : '');

  return (
    <input {...props} className={classes} onFocus={props.skipError || null} />
  );
}

export default Input;
