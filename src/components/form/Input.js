import React from 'react';


const Input = props => {

  const { name, type, value, error, className } = props;
  const classes = (className || '')
                  + (value ? ' has-value' : '')
                  + (error ? ' form-control-danger' : '');

  return (
    <input {...props} className={className} onFocus={props.skipError || null} />
  );
}

export default Input;
