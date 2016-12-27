import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validation from '../utils/validation';
import { FormGroup, VerboseErrorInput, VerboseErrorSelect, ListAutosuggest } from './form';
import AddOrder from './AddOrder';

import '../styles-local/Autosuggest.css';


const validate = (values, props) => {
  const errors = {};

  errors.description = errors.description || validation.required(values.description);

  return errors;
};


class CreatePackage extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    packagesProvider: PropTypes.object.isRequired,
    spreadsProvider: PropTypes.object.isRequired,
    spreads: PropTypes.array.isRequired,
    securities: PropTypes.array.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { created: false };
  }

  onSubmit(values) {
    const { packagesProvider, spreads } = this.props;
    console.log(values);

    packagesProvider.create(values, spreads)
      .then(() => {
        this.setState({ ...this.state, created: true });
        packagesProvider.getList();
      });
  }

  componentDidMount() {
    this.props.tagsProvider.getList();
    this.props.spreadsProvider.getList();
  }

  render() {
    const { hideModal, fields, invalid, submitting, handleSubmit,
            securities, securitiesProvider, tags, spreads } = this.props;

    return this.state.created ? (
      <div className="text-xs-center">
        <h3>You've successfully created new package</h3>
        <p>
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="btn btn-primary btn-title" onClick={hideModal}>Back to packages page</button>
      </div>
    ) : (
      <div>

        <h3 className="text-title">Create a Package</h3>
        <p>
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet.
        </p>

        <form className="m-b-2" autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>

          { /** Package name input **/ }
          <div className="row">
            <div className="col-sm-12">
              <FormGroup {...fields.description}>
                <label>Package Name:</label>
                <VerboseErrorInput type="text" className="form-control" {...fields.description} />
              </FormGroup>
            </div>
          </div>

          <div className="row m-b-2">
            <div className="col-sm-12">
              <VerboseErrorSelect fieldData={fields.strategy_tag_name}
                                  defaultOption="Select strategy tag"
                                  labelText="Strategy tag"
                                  optionsData={tags.map(t => ({value: t.id, label: t.name}))} />
            </div>
          </div>

          { /** Add orders subform(table) **/ }
          <div>
            <AddOrder orders={fields.orders}
                      securities={securities}
                      securitiesProvider={securitiesProvider} />
          </div>

          { /** Add spreads subform(table) **/ }
          <table className="table table-bordered table-borderless-top editable-fields">
            <thead className="thead-graphite">
              <tr><th>Spread Name</th></tr>
            </thead>
            <tbody>
              {
                fields.spreads.map((spread, index) => (
                  <tr key={index}>
                    <td>
                      <ListAutosuggest data={spreads}
                                       fieldName="description"
                                       placeholder="Search existing spreads"
                                       fieldData={spread.description} />
                    </td>
                    <td className="action">
                      <a onClick={() => fields.spreads.removeField(index)}>
                        <i className="icon-remove" />
                      </a>
                    </td>
                  </tr>
                ))
              }

              <tr>
                <td>
                  <a onClick={() => fields.spreads.addField({})} className="link"><i className="icon-add" /> Add Spread</a>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="text-xs-center">
            <button disabled={invalid || submitting}
                    className="btn btn-success btn-title"
                    onClick={handleSubmit(this.onSubmit)}>Create a package</button>
          </div>

          <div className="text-xs-center">
            <button className="btn btn-link" onClick={hideModal}>Back to Packages</button>
          </div>
          
        </form>

      </div>
    );
  }

}


export default reduxForm({
  form: 'createPackage',
  fields: [
    'description',
    'strategy_tag_name',
    'orders[].description',
    'orders[].security.name',
    'orders[].security.option_type',
    'orders[].security.strike_price',
    'orders[].security.expiration_price',
    'orders[].type',
    'spreads[].description',
  ],
  initialValues: {},
  validate
})(CreatePackage);
