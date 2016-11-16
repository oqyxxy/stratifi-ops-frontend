import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { DateField, DatePicker } from 'react-date-picker';
import { getDateFieldProps } from '../utils/filters';
import { FormGroup } from './form';
import OptionsChart from './charts/OptionsChart';
import ErrorMessage from './ErrorMessage';

import '../styles-local/DatePicker.css';
import '../styles-local/OptionsSection.css';


const validate = values => {
  const errors = {};

  const startDate = new Date(values.start_date);
  const endDate = new Date(values.end_date);

  if (startDate >= endDate) {
    const message = 'Start date is later than end date.'
    errors.start_date = errors.start_date || message;
    errors.end_date = errors.end_date || message;
  }

  return errors;
};


class OptionsSection extends Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    optionsProvider: PropTypes.object.isRequired
  };

  constructor(...args) {
    super(...args);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.optionsProvider.getList();
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { fields, handleSubmit, options, invalid, submitting, pristine } = this.props;
    const now = new Date();

    console.log(fields);

    return (
      <div className="m-t-3 options-section">
        <div className="m-b-3">
          <form className="m-b-2" autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>
            <table className="table table-bordered table-two-cells editable-fields">
              <thead className="thead-graphite">
               <tr>
                 <th>Start date</th>
                 <th>End date</th>
               </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="form-inline">
                    <FormGroup {...fields.start_date}>
                      <DateField {...getDateFieldProps(fields.start_date)}
                                 dateFormat="YYYY-MM-DD"
                                 placeholder="YYYY-MM-DD"
                                 defaultValue={new Date(now.getFullYear(), now.getMonth() - 1, now.getDay())}
                                 minDate={new Date(2016, 5, 1)}
                                 maxDate={new Date()}
                                 updateOnDateClick={true}
                                 collapseOnDateClick={true}>
                        <DatePicker navigation={true}
                                    locale="en"
                                    highlightWeekends={false}
                                    highlightToday={false}
                                    weekNumbers={false}
                                    footer={false} />
                      </DateField>
                    </FormGroup>
                  </td>
                  <td className="form-inline">
                    <FormGroup {...fields.end_date}>
                      <DateField {...getDateFieldProps(fields.end_date)}
                                 dateFormat="YYYY-MM-DD"
                                 placeholder="YYYY-MM-DD"
                                 defaultValue={new Date()}
                                 minDate={new Date(2016, 5, 1)}
                                 maxDate={new Date()}
                                 updateOnDateClick={true}
                                 collapseOnDateClick={true}>
                        <DatePicker navigation={true}
                                    locale="en"
                                    highlightWeekends={false}
                                    highlightToday={false}
                                    weekNumbers={false}
                                    footer={false} />
                      </DateField>
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </table>

            { fields.start_date.error && fields.end_date.error && <ErrorMessage message={fields.start_date.error} /> }

            <button type="submit"
                    onClick={handleSubmit(this.onSubmit)}
                    disabled={invalid || submitting || pristine}
                    className="btn btn-title btn-primary btn-black">Submit time range</button>
          </form>
        </div>

        <div className="m-b-3">
          <OptionsChart id="optionsChart" data={options} />
        </div>
      </div>
    );
  }

}


export default reduxForm({
  form: 'showOptionsForTimeRange',
  fields: ['start_date', 'end_date'],
  initialValues: {},
  validate
})(OptionsSection);
