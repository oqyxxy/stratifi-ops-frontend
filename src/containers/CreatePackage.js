import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PackagesProvider from '../providers/packages';
import SpreadsProvider from '../providers/spreads';
import SecuritiesProvider from '../providers/securities';
import TagTypesProvider from '../providers/tag-types';
import TagsProvider from '../providers/tags';
import validation from '../utils/validation';
import { FormGroup, VerboseErrorInput, VerboseErrorSelect, ListAutosuggest } from '../components/form';
import { Modal, ModalBody } from '../components/modals';
import CreateSpread from '../components/CreateSpread';
import CreateTag from '../components/CreateTag';
import AddOrder from '../components/AddOrder';

import '../styles-local/Autosuggest.css';
import '../styles-local/CreatePackage.css';


const validate = values => {
  const errors = {};

  errors.description = errors.description || validation.required(values.description);
  errors.strategy_tag_name = errors.strategy_tag_name || validation.required(values.strategy_tag_name);

  return errors;
};


class CreatePackage extends Component {

  static propTypes = {
    packagesProvider: PropTypes.object.isRequired,
    spreadsProvider: PropTypes.object.isRequired,
    tagTypesProvider: PropTypes.object.isRequired,
    spreads: PropTypes.array.isRequired,
    securities: PropTypes.array.isRequired,
    securitiesProvider: PropTypes.object.isRequired,
    tagsProvider: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    tagTypes: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { created: false, spreadCreateFormShown: false, tagCreateFormShown: false };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showTagModal = this.showTagModal.bind(this);
    this.hideTagModal = this.hideTagModal.bind(this);
  }

  onSubmit(values) {
    const { packagesProvider, spreads } = this.props;

    packagesProvider.create(values, spreads)
      .then(() => {
        this.setState({ ...this.state, created: true });
        packagesProvider.getList();
      });
  }

  componentDidMount() {
    this.props.tagsProvider.getList();
    this.props.spreadsProvider.getList();
    this.props.tagTypesProvider.getList();
  }

  showModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, spreadCreateFormShown: true });
  }

  hideModal(event, newSpreadId) {
    event.preventDefault();

    if (newSpreadId) {
      const { spreads, fields } = this.props;
      const spread = spreads.find(sprd => sprd.id === newSpreadId);
      spread && fields.spreads.addField({ description: spread.description });
    }

    this.setState({ ...this.state, spreadCreateFormShown: false });
  }

  showTagModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, tagCreateFormShown: true });
  }

  hideTagModal(event) {
    event.preventDefault();
    this.setState({ ...this.state, tagCreateFormShown: false });
  }

  render() {
    const {
      fields, invalid, submitting, handleSubmit, securities, securitiesProvider, tags, spreads,
      tagsProvider, spreadsProvider, tagTypes, tagTypesProvider
    } = this.props;

    return this.state.created ? (
      <div className="container">
        <div className="text-xs-center">
          <h3>You've successfully created new package</h3>
          <p>
            Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <Link className="btn btn-primary btn-title" to="/packages">Back to packages page</Link>
        </div>
      </div>
    ) : (
      <div className="create-package-container">

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
            <div className="col-sm-6">
              <VerboseErrorSelect fieldData={fields.strategy_tag_name}
                                  defaultOption="Select strategy tag"
                                  labelText="Strategy tag"
                                  optionsData={tags.map(t => ({value: t.id, label: t.name}))} />
            </div>
            <div className="col-sm-6" style={{marginTop: '1.9rem', textAlign: 'right'}}>
              <button className="btn btn-primary" onClick={this.showTagModal}>Create new tag</button>
            </div>
          </div>

          <Modal id="createTag" className="modal-lg wide" shown={this.state.tagCreateFormShown}>
            <ModalBody>
              <CreateTag tagTypes={tagTypes}
                         tagsProvider={tagsProvider}
                         tagTypesProvider={tagTypesProvider}
                         hideModal={this.hideTagModal} />
            </ModalBody>
          </Modal>

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
                  <button className="btn btn-primary m-l-2" onClick={this.showModal.bind(this)}>Create spread</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="text-xs-center">
            <button disabled={invalid || submitting}
                    className="btn btn-success btn-title"
                    type="submit"
            >Create a package</button>
          </div>

          <div className="text-xs-center">
            <Link className="btn btn-link" to="/packages">Back to Packages</Link>
          </div>
          
        </form>

        <Modal id="createSpread" className="modal-lg wide" shown={this.state.spreadCreateFormShown}>
          <ModalBody>
            <CreateSpread hideModal={this.hideModal}
                          securitiesProvider={securitiesProvider}
                          spreadsProvider={spreadsProvider}
                          securities={securities}
                          tagsProvider={tagsProvider}
                          tags={tags} />
          </ModalBody>
        </Modal>
      </div>
    );
  }

}


export default connect(
  state => ({
    spreads: state.spreads.list,
    securities: state.securities.list,
    tags: state.tags.list,
    tagTypes: state.tagTypes
  }),
  dispatch => ({
    packagesProvider: new PackagesProvider(dispatch),
    spreadsProvider: new SpreadsProvider(dispatch),
    ordersProvider: new SecuritiesProvider(dispatch),
    tagsProvider: new TagsProvider(dispatch),
    securitiesProvider: new SecuritiesProvider(dispatch),
    tagTypesProvider: new TagTypesProvider(dispatch)
  })
)(reduxForm({
  form: 'createPackage',
  fields: [
    'description',
    'strategy_tag_name',
    'orders[].description',
    'orders[].type',
    'orders[].target_price',
    'orders[].security.name',
    'orders[].security.type',
    'orders[].security.option_type',
    'orders[].security.strike_price',
    'orders[].security.expiration_date',
    'spreads[].description',
  ],
  initialValues: {},
  validate
})(CreatePackage));
