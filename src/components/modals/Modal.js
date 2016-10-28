import React, { PropTypes } from 'react';
import '../../styles-local/Modal.css';


const Modal = props => {

  const { id, className, shown, children } = props;
  const classes = `modal-dialog ${className || ''}`;

  return (
    <div id={id} className={`modal fade ${shown ? 'in' : ''}`} tabIndex="-1" role="dialog">
      <div className={classes} role="document">
        <div className="modal-content">
          {shown && children}
        </div>
      </div>
    </div>
  );

}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  shown: PropTypes.bool.isRequired
}


export default Modal;
