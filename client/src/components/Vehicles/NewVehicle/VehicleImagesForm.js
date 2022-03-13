import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
import MyDropzone from '../../custom/MyDropzone';
import SubmitButton from './SubmitButton';

class VehicleImagesForm extends Component {  

  componentDidMount() {
    // return {};
  };

  
  render(){
    const { error, touched, valid, pristine, submitting } = this.props;
    
    return (
      <div>
        <div style={{ marginTop: '10px', marginBottom: '5px'}}>
          <h5>Add some recent photos</h5>
        </div>
        <div>
          <form>
            <div className='row'>
              <Field type='file' name='images' component={MyDropzone} />
            </div>
          </form>
          <div style={{ marginTop: '5px'}}>
            <button onClick={this.props.onCancel} className='red btn-flat white-text'>Cancel</button>
            <SubmitButton disabled={!valid || pristine || submitting } className='right' />
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.images) {
    errors.images = `You must provide some recent photos`
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'vehicleImagesForm',
  destroyOnUnmount: false
})(VehicleImagesForm);