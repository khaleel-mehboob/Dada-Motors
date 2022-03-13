import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Vehicles extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.getVehicleList();
  }

  renderVehicles () {
    const isLoggedIn = this.props.auth === (null || false) ? false : true;    

    if(isLoggedIn === false) {
      return _.map(this.props.vehicles, vehicle => {
        return (
          <div className="col s4" key={vehicle._id}>
            <div className="card" style={{ backgroundColor: '#eeeeee'}}>
              <div className="card-title" style={{ padding: '3px', fontSize: '14pt'}}>
                <a href={'/vehicle/' + vehicle._id} className='black-text'>
                  { vehicle.make + ' ' + vehicle.model }
                </a>
                <span className='right'><strong>R { vehicle.price }</strong></span>
              </div>
              <div className="card-image">
                <img src="images/sample-1.jpg" alt='' />
                <a href={'/vehicle/' + vehicle._id}>
                  <span className="card-title">{ vehicle.name }</span>
                </a>
              </div>
              <div className="card-content" style={{ height: '160px', backgroundColor: '#ffffff'}}>
                <div className='col s6'>
                  <ul className='left'>
                    <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '5px'}}>directions_car</i>{vehicle.condition}</li>
                    <li style={{ marginBottom: '10px'}}><i key={vehicle.mileage} className='material-icons tiny' style={{ marginRight: '5px'}}>network_check</i>{vehicle.mileage + ' KM'}</li>
                    <li style={{ marginBottom: '10px'}}><i key={vehicle.transmission} className='material-icons tiny' style={{ marginRight: '5px'}}>swap_horiz</i>{vehicle.transmission}</li>
                  </ul>
                </div>
                <div className='col s6'>
                  <ul>
                    <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '5px'}}>date_range</i>{vehicle.year}</li>
                    <li style={{ marginBottom: '10px'}}><i  className='material-icons tiny' style={{ marginRight: '5px'}}>local_gas_station</i>{vehicle.fuel}</li>
                    <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '5px'}}>color_lens</i>{vehicle.color}</li>
                  </ul>
                </div>
              </div>
              <div className='card-action'>
                <a href={'/vehicle/' + vehicle._id}>
                  <span className='red-text'>show more</span>
                </a>
              </div>
            </div>
          </div>
        );
      });
    }

    return _.map(this.props.vehicles, vehicle => {
      return (
          <div key={vehicle._id}>
            <div className="col s4">
              <div className="card" style={{ backgroundColor: '#eeeeee'}}>
                <div className="card-title" style={{ padding: '3px', fontSize: '14pt'}}>
                  <a href={'/vehicle/' + vehicle._id} className='black-text'>
                    { vehicle.make + ' ' + vehicle.model }
                  </a>
                  <span className='right'><strong>R { vehicle.price }</strong></span>
                </div>
                <div className="card-image">
                  <img src="images/sample-1.jpg" alt='' />
                  <a href={'/vehicle/' + vehicle._id}>
                    <span className="card-title">{ vehicle.name }</span>
                  </a>
                  <button onClick={() => this.props.deleteVehicle(vehicle._id, this.props.history)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">delete_forever</i></button>
                </div>
                <div className="card-content" style={{ height: '160px', backgroundColor: '#ffffff'}}>
                  <div className='col s6'>
                    <ul className='left'> 
                      <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '10px'}}>directions_car</i>{vehicle.condition}</li>
                      <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '10px'}}>network_check</i>{vehicle.mileage + 'KMs'}</li>
                      <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '10px'}}>swap_horiz</i>{vehicle.transmission}</li>
                    </ul>
                  </div>
                  <div className='col s6'>
                    <ul>
                      <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '10px'}}>date_range</i>{vehicle.year}</li>
                      <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '10px'}}>local_gas_station</i>{vehicle.fuel}</li>
                      <li style={{ marginBottom: '10px'}}><i className='material-icons tiny' style={{ marginRight: '10px'}}>color_lens</i>{vehicle.color}</li>
                    </ul>
                  </div>
                </div>
                <div className='card-action'>
                  <a href={'/vehicle/' + vehicle._id}>
                    <span className='red-text'>show more</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
    });
  }

  renderAddButton () {
    if(this.props.auth !== (null || false)) {
      return (
        <div className='fixed-action-btn'>
          <a href='/vehicles/new' className='btn-floating btn-large teal'>
            <i className='material-icons'>add</i>
          </a>
        </div>
      );
    }
  };

  render() {
    return (
      <div className='container'>
        <h4>Vehicles List</h4>
        <div className='row s12 m5'>
          {this.renderVehicles()}
          {this.renderAddButton()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, vehicles }) {
  return { auth, vehicles };
}

export default connect(mapStateToProps, actions)(Vehicles);