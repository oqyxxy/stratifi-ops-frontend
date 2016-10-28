import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import FormGroup from './FormGroup';


export default class VerboseErrorAutosuggest extends Component {

  constructor(...args) {
    super(...args);
    this.state = { touched: false };
    this.touch = this.touch.bind(this);
  }

  touch() {
    if (!this.state.touched) this.setState({touched: true});
  }

  validate(error) {
    if (error) return error;
    if (!this.props.suggestions.length) return 'No matching items exist';
  }

  render() {
    const { field } = this.props;
    let { error } = field;
    this.props.inputProps.onBlur = this.touch;

    error = this.validate(error);

    return (
      <FormGroup {...field} touched={this.state.touched} >
        <Autosuggest {...this.props}  />
        {this.state.touched && error && <span className="text-danger">{error}</span>}
      </FormGroup>
    );
  }

}
