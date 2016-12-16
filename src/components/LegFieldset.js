import React, { Component, PropTypes } from 'react';
import Input from './form/Input';


export default class LegFieldset extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    placeholders: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { fields, placeholders, title } = this.props;
    const inputs = [];
    let counter = 1;
    for (let fieldName in fields) {
      if (!fields.hasOwnProperty(fieldName)) continue;
      inputs.push(<label key={counter++}>{fieldName.split('_').join(' ')}</label>);
      inputs.push(<Input {...fields[fieldName]} key={counter++} placeholder={placeholders[fieldName]} />);
    }

    return (
      <fieldset>
        <h4>{title}</h4>
        {inputs}
      </fieldset>
    );
  }

}
