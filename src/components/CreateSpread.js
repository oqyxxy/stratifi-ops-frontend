import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { FormGroup, VerboseErrorInput } from './form';
import AddOrder from './AddOrder';


class CreateSpread extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit, fields, invalid, submitting, hideModal } = this.props;

    return (
      <div>

        <form className="m-b-2" autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>

          { /** Package name input **/ }
          <div className="row m-b-2">
            <div className="col-sm-12">
              <FormGroup {...fields.name}>
                <label>Spread Name:</label>
                <VerboseErrorInput type="text" className="form-control" {...fields.name} />
              </FormGroup>
            </div>
          </div>

          { /** Add orders subform(table) **/ }
          <div>
            <AddOrder orders={fields.orders} />
          </div>

          <div className="text-xs-center m-b-1">
            <button disabled={invalid || submitting}
                    type="submit"
                    className="btn btn-success btn-title"
                    onClick={handleSubmit(this.onSubmit)}>Create spread</button>
          </div>

          <div className="text-xs-center">
            <button className="btn btn-link" onClick={hideModal}>Back to Package</button>
          </div>

        </form>

      </div>
    );
  }

}


export default reduxForm({
  form: 'createSpread',
  fields: [
    'name',
    'orders[].name',
    'orders[].security',
    'orders[].type',
    'orders[].tag'
  ],
  initialValues: {}
})(CreateSpread);
