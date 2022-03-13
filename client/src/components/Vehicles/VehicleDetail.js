import React, { Component } from 'react';
import Slideshow from './Vehicle/Slideshow';
import CarDetail from './Vehicle/CarDetail';
import Description from './Vehicle/Description';
import { connect } from 'react-redux'; 
import * as actions from '../../actions';

class VehicleDetail extends Component {

  componentDidMount() {
    this.props.getVehicleList();
  };

  renderVehicle () {
    
    const id = this.props.location.pathname.split('/')[2];
    const vehicle = this.props.vehicles.find(obj => {return obj._id === id});

    if(vehicle) {
      return (
        <div>
          <CarDetail 
            name={vehicle.name} model={vehicle.model} make={vehicle.make} price={vehicle.price} 
            condition={vehicle.condition} body={vehicle.body} mileage={vehicle.mileage} transmission={vehicle.transmission} 
            year={vehicle.year} fuel={vehicle.fuel} color={vehicle.color} drive={vehicle.drive}
          />
          <Description description={vehicle.description} />
          <Slideshow images={vehicle.images}/>
        </div>
      );
    };

    return;
  }

  render() {
    return (
      <div className='container'>
        {this.renderVehicle()}
      </div>
    );
  }
}

function mapStateToProps({auth, vehicles }) {
  return { auth, vehicles };
};

export default connect(mapStateToProps, actions)(VehicleDetail);