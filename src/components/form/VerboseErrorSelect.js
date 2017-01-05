import React, { Component, PropTypes } from 'react';
import FormGroup from './FormGroup';


export default class VerboseErrorSelect extends Component {

  static propTypes = {
    fieldData: PropTypes.object.isRequired,
    optionsData: PropTypes.array.isRequired,
    defaultOption: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired
  };

  render() {
    const {fieldData, defaultOption, optionsData, labelText} = this.props;
    const {touched, error, name, onBlur, onChange, onDragStart, onDrop, onFocus,} = fieldData;
    const invalid = Boolean(touched && error);

    return (
      <FormGroup {...this.props.fieldData}>
        <label>{labelText}:</label>
        <div>
          <div className="c-select-wrap">
            <select defaultValue="" className="form-control c-select" {...{
              name,
              onBlur,
              onChange,
              onDragStart,
              onDrop,
              onFocus
            }}>
              <option value="" disabled>{defaultOption}</option>
              {
                optionsData.map((item, index) => {
                  return (<option value={item.value} key={index}>{item.label}</option>);
                })
              }
            </select>
          </div>
        </div>
        { invalid && <div className="text-danger">{error}</div> }
      </FormGroup>
    );
  }

}
