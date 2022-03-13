import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import vehicleFormFields from './vehicleFormFields';

const createRenderer = render => ({input, label, meta: { touched, error }, ...rest }) => {
  return (
    <div>
      <label style={{ fontSize: '24px' }}>{label}</label>
      {render(input, label, rest)}
      <div className='red-text' style={{ marginBottom: '10px' }}>
        {touched && error}
      </div>
    </div>
  );
};

const renderInput = createRenderer((input, label) => {
  return <input {...input} style={{ marginBottom: '5px' }} />
});

const renderSelect = createRenderer((input, label, {children}) => {
  return (
    <select className='flat browser-default' {...input} style={{ marginBottom: '5px', borderBottom: '1px solid' }}>
      <option value='' disabled>Select {label}</option>
      {children}
    </select>
  );
});

function renderFields() {
  return _.map(vehicleFormFields, ({ label, type, name, controlType, values }) => {
    
    if(controlType === 'input') {
      return (
        <div className='col s4' key={name} style={{ height: '120px'}}>
          <Field label={label} type={type} name={name} component={renderInput} />
        </div>
      );
    }

    if(controlType === 'select') {
      return (
        <div className='col s4' key={name} style={{ height: '120px'}}>
          <Field label={label} values={values} name={name} component={renderSelect}>
            {
              values.map(value => 
                <option key={value} value={value}>
                  {value}
                </option>
              )
            }
          </Field>
        </div>
      );
    }
  });
}

class VehicleForm extends Component {  

  componentDidMount() {
    // return {};
  };

  render(){
    return (
      <div>
        <div style={{ marginTop: '10px', marginBottom: '5px'}}>
          <h5>Add General Information</h5>
        </div>
        <form>
          <div className='row'>
            {renderFields()}
          </div>
          <div style={{ marginTop: '5px'}}>
            <Link to='/vehicles' className='red btn-flat white-text'>Cancel</Link>
            <button disabled={this.props.submitting} onClick={this.props.handleSubmit(this.props.onFormSubmit)} type='submit' className='teal btn-flat right white-text'>
              Next
              <i className='material-icons right'>done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.forEach(vehicleFormFields, ({ name }) => {
    if(!values[name]) {
      errors[name] = `You must provide ${name}`
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'vehicleForm',
  destroyOnUnmount: false
})(VehicleForm);