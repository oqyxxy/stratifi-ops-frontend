import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import FormGroup from './FormGroup';


export default class VerboseErrorAutosuggest extends Component {

  render() {
    const { field } = this.props;
    let { error } = field;

    return (
      <FormGroup {...field}>
        <Autosuggest {...this.props}  />
        {error && <span className="text-danger">{error}</span>}
      </FormGroup>
    );
  }

}
