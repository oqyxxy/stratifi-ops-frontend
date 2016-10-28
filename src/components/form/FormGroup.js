import React from 'react';


const FormGroup = props => {

  const validateNonTouched = !!props.validateNonTouched;
  const className = (props.className || 'form-group')
    + ((props.touched || validateNonTouched) && props.error ? ' has-danger' : '');

  return (
    <div className={className} onClick={props.skipError || null}>
      {props.children}
    </div>
  );

}

export default FormGroup;
