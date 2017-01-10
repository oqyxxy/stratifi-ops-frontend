import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validation from '../utils/validation';
import { FormGroup, VerboseErrorInput } from './form';
import AddSpreadLeg from '../components/AddSpreadLeg';


const validate = values => {
  const errors = {};

  errors.description = errors.description || validation.required(values.description);

  return errors;
};


class CreateSpread extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    packagesProvider: PropTypes.object,
    spreadsProvider: PropTypes.object.isRequired,
    securities: PropTypes.array.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    packId: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = { created: false, newSpreadId: null };
  }

  updateLegsCount(event) {
    const { orders } = this.props.fields;

    if (!event.target.value) {
      let index = orders.length;
      for (; index > 0; --index) orders.removeField(index - 1);
      return;
    }

    const newLegsCount = Number.parseInt(event.target.value, 10);
    const currentLegsCount = orders.length;

    if (newLegsCount > currentLegsCount) {
      let diff = newLegsCount - currentLegsCount;
      for (; diff > 0; --diff) orders.addField({security: {type: 'Option'}});
    } else if (currentLegsCount > newLegsCount) {
      let diff = currentLegsCount - newLegsCount;
      for (; diff > 0; --diff) orders.removeField(newLegsCount + diff - 1);
    }
  }

  goBack(event) {
    this.props.hideModal(event, this.state.newSpreadId);
  }

  onSubmit(values) {
    const { spreadsProvider, packId, packagesProvider } = this.props;

    return spreadsProvider.create(values, packId).then(json => {
      this.setState({ ...this.state, created: true, newSpreadId: json.id });
      (packId && packagesProvider) && packagesProvider.getObject(packId);
      spreadsProvider.getList();
    });
  }

  render() {
    const { handleSubmit, fields, invalid, submitting, hideModal, packId } = this.props;

    return this.state.created ? (
      <div className="text-xs-center">
        <h3>You've successfully created new spread</h3>
        <p>
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="btn btn-primary btn-title" onClick={this.goBack}>{`Back to package ${packId ? 'page' : 'creation'}`}</button>
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

          <div className="form-group">
            <label>Number of legs:</label>
            <input type="number" className="form-control" onChange={this.updateLegsCount.bind(this)} />
          </div>

          <div className="m-b-3">
            {
              fields.orders.length ? <AddSpreadLeg orders={fields.orders} /> : <p>Increase number of legs to add fields.</p>
            }
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
    'orders[].type',
    'orders[].ratio',
    'orders[].security.name',
    'orders[].security.strike_price',
    'orders[].security.expiration_date',
    'orders[].security.type'
  ],
  validate
})(CreateSpread);
