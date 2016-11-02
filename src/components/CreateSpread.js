import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { FormGroup, VerboseErrorInput } from './form';
import AddOrder from './AddOrder';


class CreateSpread extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    packagesProvider: PropTypes.object.isRequired,
    spreadsProvider: PropTypes.object.isRequired,
    securities: PropTypes.array.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    packId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { created: false };
  }

  onSubmit(values) {
    const { spreadsProvider, tags, securities, packId, packagesProvider } = this.props;

    spreadsProvider.create(values, packId, tags, securities).then(() => {
      this.setState({ created: true });
      packagesProvider.getObject(packId);
    });
  }

  render() {
    const { handleSubmit, fields, invalid, submitting, hideModal, securities,
            securitiesProvider, tags, tagsProvider } = this.props;

    return this.state.created ? (
      <div className="text-xs-center">
        <h3>You've successfully created new spread</h3>
        <p>
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="btn btn-primary btn-title" onClick={hideModal}>Back to package page</button>
      </div>
    ) : (
      <div>

        <h3 className="text-title">Create a Spread</h3>
        <p>
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet.
        </p>

        <form className="m-b-2" autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>

          { /** Package name input **/ }
          <div className="row m-b-2">
            <div className="col-sm-12">
              <FormGroup {...fields.description}>
                <label>Spread Name:</label>
                <VerboseErrorInput type="text" className="form-control" {...fields.description} />
              </FormGroup>
            </div>
          </div>

          { /** Add orders subform(table) **/ }
          <div>
            <AddOrder securities={securities}
                      securitiesProvider={securitiesProvider}
                      orders={fields.orders}
                      tags={tags}
                      tagsProvider={tagsProvider} />
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
    'description',
    'orders[].description',
    'orders[].security',
    'orders[].type',
    'orders[].tags'
  ],
  initialValues: {}
})(CreateSpread);
