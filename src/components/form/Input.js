import React from 'react';


const Input = props => {

  const { value, error, className, checked, name, onBlur, onChange, onDragStart, onDrop, onFocus, type, placeholder } = props;
  const classes = (className || '')
                  + (value ? ' has-value' : '')
                  + (error ? ' form-control-danger' : '');
  return (
    <input {...{ checked, name, onBlur, onChange, onDragStart, onDrop, onFocus, type, placeholder, value }}
           className={classes} onFocus={props.skipError || null} />
  );
}

export default Input;
