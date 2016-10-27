import React from 'react';


const Input = props => {

  const className = (props.className || '')
    + (props.value ? ' has-value' : '')
    + (props.error ? ' form-control-danger' : '');

  return (
    <input {...props} className={className} onFocus={props.skipError || null} />
  );
}


export default Input;
