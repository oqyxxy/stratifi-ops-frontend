import React, { Component, PropTypes } from 'react';
import { AUTOSUGGEST_THEME } from '../../constants/rendering';
import VerboseErrorAutosuggest from './VerboseErrorAutosuggest';


export default class ListAutosuggest extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    fieldName: PropTypes.string.isRequired,
    fieldData: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {suggestions: []};
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    const { data, fieldName } = this.props;
    this.setState({
      suggestions: data.filter(item => item[fieldName] && item[fieldName].indexOf(value) !== -1)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({ ...this.state, suggestions: [] });
  }

  render() {
    const { fieldData, fieldName, placeholder } = this.props;

    return (
      <VerboseErrorAutosuggest field={fieldData}
                               suggestions={this.state.suggestions}
                               getSuggestionValue={suggestion => suggestion[fieldName]}
                               renderSuggestion={suggestion => <span>{suggestion[fieldName]}</span>}
                               onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                               onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                               inputProps={{
                                 placeholder,
                                 value: fieldData.value || '',
                                 onChange: (event, { newValue }) => fieldData.onChange(newValue)
                               }}
                               theme={AUTOSUGGEST_THEME} />
    );
  }

}
