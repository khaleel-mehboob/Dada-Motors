import React, { Component } from 'react';
import VehicleForm from './NewVehicle/VehicleForm';
import VehicleImagesForm from './NewVehicle/VehicleImagesForm';
import { reduxForm } from 'redux-form';

class VehicleNew extends Component {
  state = { showImagesForm: false };
  
  renderContent() {
    if(this.state.showImagesForm === true) {
      return <VehicleImagesForm onCancel={() => this.setState({ showImagesForm: false })} />
    }

    return (<VehicleForm 
      onFormSubmit={() => this.setState({ showImagesForm: true })}
    />);
  }

  render(){
    return (
      <div className='container'>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'vehicleForm'
})(VehicleNew);