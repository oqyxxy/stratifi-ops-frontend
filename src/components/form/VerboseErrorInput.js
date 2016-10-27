import React from 'react';
import Input from './Input';


export const VerboseErrorInput = props => {

    const { touched, error } = props;

    return (
      <fieldset>
        <Input {...props} />
        { touched && error && <span className="text-danger">{error}</span> }
      </fieldset>
    );

}
