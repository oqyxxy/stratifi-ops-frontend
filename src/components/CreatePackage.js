import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';


class CreatePackage extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired
  };

  render() {
    const { hideModal, fields, invalid, submitting } = this.props;

    return (
      <div>
        <p>Form goes here</p>
        <div className="text-xs-center">
          <button className="btn btn-link" onClick={hideModal}>Back to Packages</button>
        </div>
      </div>
    );
  }

}


export default reduxForm({
  form: 'createPackage',
  fields: [
    'name',
    'orders[].name',
    'orders[].security',
    'orders[].type',
    'orders[].tags',
    'spreads[].name',
  ],
  initialValues: {},
  validate: () => ({})
})(CreatePackage);
