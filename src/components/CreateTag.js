import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { VerboseErrorInput, VerboseErrorSelect } from './form';


class CreateTag extends Component {

  static propTypes = {
    tagTypes: PropTypes.array.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { created: false };
  }

  onSubmit(values) {
    const { tagsProvider } = this.props;
    tagsProvider.create(values)
      .then(() => tagsProvider.getList())
      .then(() => this.setState({ created: true }));
  }

  render() {
    const { fields, handleSubmit, tagTypes, hideModal } = this.props;

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
        <VerboseErrorInput type="text" placeholder="Tag name" className="form-control m-b-2" {...fields.name} />
        <VerboseErrorInput type="text" placeholder="Tag description" className="form-control m-b-2" {...fields.description} />
        <VerboseErrorSelect fieldData={fields.type}
                            defaultOption="Select tag type"
                            labelText="Tag type"
                            optionsData={tagTypes.map(t => ({value: t.id, label: t.name}))} />
        <button className="btn btn-primary btn-title m-b-2 m-r-2" onClick={handleSubmit(this.onSubmit.bind(this))}>Create tag</button>
        <button className="btn btn-primary btn-title btn-black m-b-2" onClick={hideModal}>Cancel</button>
      </div>
    );
  }

}


export default reduxForm({
  form: 'create-tag',
  fields: ['name', 'description', 'type']
})(CreateTag);
