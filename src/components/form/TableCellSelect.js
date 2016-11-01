import React from 'react';
import FormGroup from './FormGroup';


const TableCellSelect = props => {

  const { touched, error, name, onBlur, onChange, onDragStart, onDrop, onFocus, } = props.fieldData,
    { optionsData, defaultOption } = props,
    invalid = !!(touched && error),
    invalidStyles = { borderBottom: '2px solid #FF002D' },
    messageStyles = {
      marginTop: 10,
      marginBottom: -12,
      marginLeft: -14,
      fontSize: 12
    };

  return (
    <td style={invalid ? invalidStyles : null}>
      <FormGroup {...props.fieldData}>
        <div className="c-select-wrap">
          <select defaultValue="" className="form-control c-select" {...{ name, onBlur, onChange, onDragStart, onDrop, onFocus }}>
            <option value="" disabled>{defaultOption}</option>
            {
              optionsData.map((item) => {
                return (<option value={item} key={item}>{item}</option>);
              })
            }
          </select>
        </div>
        { invalid && <div className="text-danger" style={messageStyles}>{error}</div> }
      </FormGroup>
    </td>
  );

};

export default TableCellSelect;
