import React, { PropTypes } from 'react';


const ModalHeader = props => {
  const { className, title, hideModal } = props;
  const classes = `modal-header ${className || ''}`;

  return title ? (
      <div className={classes}>
        <button type="button" className="close" onClick={hideModal} data-dismiss="modal" aria-label="Close">
          <span className="icon-remove"></span>
        </button>
        <h3 className="modal-title text-title">{title}</h3>
      </div>
  ) : (
      <button type="button" className="close" onClick={hideModal} data-dismiss="modal" aria-label="Close">
        <span className="icon-remove"></span>
      </button>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  hideModal: PropTypes.func,
};


export default ModalHeader;
