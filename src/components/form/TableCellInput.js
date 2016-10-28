import React from 'react';
import Input from './Input';
import FormGroup from './FormGroup';


const TableCellInput = props => {

  const { touched, error } = props,
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
       <FormGroup {...props}>
         <Input type="text" className="form-control" {...props} />
         { invalid && <div className="text-danger" style={messageStyles}>{error}</div> }
       </FormGroup>
     </td>
   );

};

export default TableCellInput;
