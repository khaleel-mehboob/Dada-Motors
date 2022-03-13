import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom';

const SubmitButton = ({disabled, vehicleFormValues, vehicleImages, submitVehicle, history}) => {
  return (
    <button
      disabled={disabled}
      className='teal right btn-flat white-text'
      onClick={() => submitVehicle(vehicleFormValues, vehicleImages, history)}
    >
      Save
      <i className='material-icons right'>save</i>
    </button>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    vehicleFormValues: state.form.vehicleForm.values,
    vehicleImages: state.form.vehicleImagesForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SubmitButton));
