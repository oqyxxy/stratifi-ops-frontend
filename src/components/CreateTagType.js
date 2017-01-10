import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validation from '../utils/validation';
import { VerboseErrorInput, FormGroup } from './form';


const validate = values => {
  const errors = {};

  errors.name = errors.name || validation.required(values.name);
  errors.description = errors.description || validation.required(values.description);

  return errors;
};


class CreateTagType extends Component {

  static propTypes = {
    tagTypesProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { created: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.createOneMore = this.createOneMore.bind(this);
  }

  onSubmit(values) {
    const { tagTypesProvider } = this.props;
    return tagTypesProvider.create(values)
      .then(() => tagTypesProvider.getList())
      .then(() => this.setState({ ...this.state, created: true }));
  }

  createOneMore() {
    this.setState({ ...this.state, created: false });
  }

  render() {
    const { fields, handleSubmit, invalid, submitting } = this.props;

    return this.state.created ? (
      <div>
        <p className="m-b-2">You've successfully created new tag type.</p>
        <button className="btn btn-primary btn-title btn-black m-b-3" onClick={this.createOneMore}>Create one more</button>
      </div>
    ) : (
      <div>
        <FormGroup {...fields.name}>
          <label>Tag type name:</label>
          <VerboseErrorInput type="text" placeholder="Tag type name" className="form-control m-b-2" {...fields.name} />
        </FormGroup>
        <FormGroup {...fields.description}>
          <label>Tag type description:</label>
          <VerboseErrorInput type="text" placeholder="Tag type description" className="form-control m-b-2" {...fields.description} />
        </FormGroup>
        <button className="btn btn-primary btn-title btn-black m-b-3"
                disabled={invalid || submitting}
                onClick={handleSubmit(this.onSubmit)}>
          Create tag type
        </button>
      </div>
    );
  }

}


export default reduxForm({
  form: 'create-tag-type',
  fields: ['name', 'description'],
  validate
})(CreateTagType);
