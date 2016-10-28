import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { AUTOSUGGEST_THEME } from '../constants/rendering';
import { FormGroup, VerboseErrorInput, VerboseErrorAutosuggest } from './form';
import AddOrder from './AddOrder';


class CreatePackage extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    packagesProvider: PropTypes.object.isRequired,
    spreads: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { spreadSuggestions: [] };
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.spreads && this.setState({ spreadSuggestions: nextProps.spreads });
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({ spreadSuggestions: this.props.spreads.filter(sprd => sprd.name.includes(value)) });
  }

  onSuggestionsClearRequested() {
    this.setState({ spreadSuggestions: [] });
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { hideModal, fields, invalid, submitting, handleSubmit, spreads } = this.props;

    return (
      <div>

        <form className="m-b-2" autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>

          { /** Package name input **/ }
          <div className="row m-b-2">
            <div className="col-sm-12">
              <FormGroup {...fields.name}>
                <label>Package Name:</label>
                <VerboseErrorInput type="text" className="form-control" {...fields.name} />
              </FormGroup>
            </div>
          </div>

          { /** Add orders subform(table) **/ }
          <div>
            <AddOrder orders={fields.orders} />
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
                      <VerboseErrorAutosuggest field={spread.name}
                                               suggestions={spreads}
                                               getSuggestionValue={suggestion => suggestion.name}
                                               renderSuggestion={suggestion => <span>{suggestion.name}</span>}
                                               onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                               onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                               inputProps={{
                                                 placeholder: 'Search existing spreads',
                                                 value: spread.name.value || '',
                                                 onChange: (event, { newValue }) => spread.name.onChange(newValue)
                                               }}
                                               theme={AUTOSUGGEST_THEME} />
                    </td>
                  </tr>
                ))
              }

              <tr>
                <td>
                  <a onClick={() => fields.spreads.addField({})} className="link"><i className="icon-add"></i> Add Spread</a>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="text-xs-center">
            <button disabled={invalid || submitting}
                    className="btn btn-success btn-title"
                    onClick={handleSubmit(this.onSubmit)}>Create a package</button>
          </div>
        </form>

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
    'orders[].tag',
    'spreads[].name',
  ],
  initialValues: {},
  validate: () => ({})
})(CreatePackage);
