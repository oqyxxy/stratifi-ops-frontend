import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { AUTOSUGGEST_THEME } from '../constants/rendering';
import { FormGroup, VerboseErrorInput, VerboseErrorAutosuggest } from './form';
import AddOrder from './AddOrder';

import '../styles-local/Autosuggest.css';


class CreatePackage extends Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    packagesProvider: PropTypes.object.isRequired,
    spreads: PropTypes.array.isRequired,
    securities: PropTypes.array.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { spreadSuggestions: [], created: false };
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({ ...this.state, spreadSuggestions: this.props.spreads.filter(sprd => sprd.description.indexOf(value) !== -1) });
  }

  onSuggestionsClearRequested() {
    this.setState({ ...this.state, spreadSuggestions: [] });
  }

  onSubmit(values) {
    const { packagesProvider, spreads, tags, securities } = this.props;

    packagesProvider.create(values, spreads, tags, securities)
      .then(() => {
        this.setState({ ...this.state, created: true });
        packagesProvider.getList();
      });
  }

  render() {
    const { hideModal, fields, invalid, submitting, handleSubmit,
            securities, securitiesProvider, tags, tagsProvider } = this.props;

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

        <form className="m-b-2" autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>

          { /** Package name input **/ }
          <div className="row m-b-2">
            <div className="col-sm-12">
              <FormGroup {...fields.description}>
                <label>Package Name:</label>
                <VerboseErrorInput type="text" className="form-control" {...fields.description} />
              </FormGroup>
            </div>
          </div>

          { /** Add orders subform(table) **/ }
          <div>
            <AddOrder orders={fields.orders}
                      securities={securities}
                      securitiesProvider={securitiesProvider}
                      tags={tags}
                      tagsProvider={tagsProvider} />
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
                      <VerboseErrorAutosuggest field={spread.description}
                                               suggestions={this.state.spreadSuggestions}
                                               getSuggestionValue={suggestion => suggestion.description}
                                               renderSuggestion={suggestion => <span>{suggestion.description}</span>}
                                               onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                               onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                               inputProps={{
                                                 placeholder: 'Search existing spreads',
                                                 value: spread.description.value || '',
                                                 onChange: (event, { newValue }) => spread.description.onChange(newValue)
                                               }}
                                               theme={AUTOSUGGEST_THEME} />
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
    'orders[].name',
    'orders[].security',
    'orders[].type',
    'orders[].tags',
    'spreads[].description',
  ],
  initialValues: {}
})(CreatePackage);
