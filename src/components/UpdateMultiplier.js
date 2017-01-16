import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { VerboseErrorInput, FormGroup } from './form';
import validation from '../utils/validation';


const validate = values => {
  const errors = {};
  errors.multiplier = errors.multiplier || validation.required(values.multiplier);
  return errors;
};


class UpdateMultiplier extends Component {

  static propTypes = {
    pack: PropTypes.object.isRequired,
    packagesProvider: PropTypes.object.isRequired
  };

  updateMultiplier(values) {
    const { packagesProvider, pack } = this.props;
    if (pack.multiplier === values.multiplier) return Promise.resolve();
    return packagesProvider.updateMultiplier(pack.id, values.multiplier)
      .then(() => packagesProvider.getObject(pack.id));
  }

  undoMultiplier() {
    const { packagesProvider, pack } = this.props;
    packagesProvider.updateMultiplier(pack.id, pack.prev_multiplier)
      .then(() => packagesProvider.getObject(pack.id));
  }

  render() {
    const { fields, handleSubmit, pack } = this.props;

    return (
      <div className="row">
        <div className="col-md-3">
          <FormGroup {...fields.multiplier}>
            <label>Multiplier:</label>
            <VerboseErrorInput type="number"
                               className="form-control"
                               {...fields.multiplier}
                               onBlur={handleSubmit(this.updateMultiplier.bind(this))} />
          </FormGroup>
        </div>
        <div className="col-md-9" style={{marginTop: '1.9rem', textAlign: 'right'}}>
          {
            pack.multiplier !== pack.prev_multiplier && <button className="btn btn-primary btn-black"
                                                                onClick={this.undoMultiplier.bind(this)}>Undo</button>
          }
        </div>
      </div>
    );
  }

}


export default reduxForm({
  fields: ['multiplier'],
  validate
}, (state, ownProps) => ({
  initialValues: {multiplier: ownProps.pack.multiplier}
}))(UpdateMultiplier);
