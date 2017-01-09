import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validation from '../utils/validation';
import { VerboseErrorInput, VerboseErrorSelect, FormGroup } from './form';
import CreateTagType from './CreateTagType';


const validate = values => {
  const errors = {};

  errors.name = errors.name || validation.required(values.name);
  errors.description = errors.description || validation.required(values.description);
  errors.type = errors.type || validation.required(values.type);

  return errors;
};


class CreateTag extends Component {

  static propTypes = {
    tagTypes: PropTypes.array.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tagTypesProvider: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { created: false, createTagTypeShown: false };
    this.toggleTagTypesCreation = this.toggleTagTypesCreation.bind(this);
  }

  toggleTagTypesCreation() {
    this.setState({ ...this.state, createTagTypeShown: !this.state.createTagTypeShown });
  }

  onSubmit(values) {
    const { tagsProvider } = this.props;
    tagsProvider.create(values)
      .then(() => tagsProvider.getList())
      .then(() => this.setState({ ...this.state, created: true }));
  }

  render() {
    const { fields, handleSubmit, tagTypes, tagTypesProvider, hideModal } = this.props;
    const { createTagTypeShown } = this.state;

    return this.state.created ? (
      <div className="text-xs-center">
        <h3>You've successfully created new tag</h3>
        <p>
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="btn btn-primary btn-title" onClick={hideModal}>Close modal</button>
      </div>
    ) : (
      <div>
        <h3 className="text-title">Create a Tag</h3>
        <p className="m-b-2">
          Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet.
        </p>
        <FormGroup {...fields.name}>
          <label>Tag name:</label>
          <VerboseErrorInput type="text" placeholder="Tag name" className="form-control m-b-2" {...fields.name} />
        </FormGroup>
        <FormGroup {...fields.description}>
          <label>Tag description:</label>
          <VerboseErrorInput type="text" placeholder="Tag description" className="form-control m-b-2" {...fields.description} />
        </FormGroup>
        <div className="row m-b-2">
          <div className="col-sm-6">
            <VerboseErrorSelect fieldData={fields.type}
                                defaultOption="Select tag type"
                                labelText="Tag type"
                                optionsData={tagTypes.map(t => ({value: t.id, label: t.name}))} />
          </div>
          <div className="col-sm-6" style={{marginTop: '1.9rem', textAlign: 'right'}}>
            <button className="btn btn-primary btn-black" onClick={this.toggleTagTypesCreation}>{createTagTypeShown ? 'Close' : 'Add tag type'}</button>
          </div>
        </div>
        { createTagTypeShown && <CreateTagType tagTypesProvider={tagTypesProvider} /> }
        <button className="btn btn-primary btn-title m-b-2 m-r-2" onClick={handleSubmit(this.onSubmit.bind(this))}>Create tag</button>
        <button className="btn btn-primary btn-title btn-black m-b-2" onClick={hideModal}>Cancel</button>
      </div>
    );
  }

}


export default reduxForm({
  form: 'create-tag',
  fields: ['name', 'description', 'type'],
  validate
})(CreateTag);
