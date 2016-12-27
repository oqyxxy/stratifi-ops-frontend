import React from 'react';
import Input from './Input';
import FormGroup from './FormGroup';


const TableCellInput = props => {

  const { touched, error } = props,
      invalid = !!(touched && error);

   return (
     <td>
       <FormGroup {...props}>
         <Input type="text" className="form-control" {...props} />
         { invalid && <div className="text-danger">{error}</div> }
       </FormGroup>
     </td>
   );

};

export default TableCellInput;
