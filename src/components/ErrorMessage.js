import React, { PropTypes } from 'react';
import '../styles-local/ErrorMessage.css';


const ErrorMessage = props => <div className="error-message">{props.message}</div>;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
