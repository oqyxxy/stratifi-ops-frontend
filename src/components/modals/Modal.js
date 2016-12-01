import React, { PropTypes } from 'react';
import '../../styles-local/Modal.css';


const Modal = props => {

  const { className, shown, children } = props;
  const classes = `modal-dialog ${className || ''}`;

  return shown ? (
      <div className={classes} role="document">
        <div className="modal-content">
          {shown && children}
        </div>
      </div>
  ) : null;

};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  shown: PropTypes.bool.isRequired
};


export default Modal;
