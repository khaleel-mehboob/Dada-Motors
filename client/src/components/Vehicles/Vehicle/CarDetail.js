import React from 'react';
import Feature from './Feature';

const CarDetail = ({name, model, make, price, condition, body, mileage, transmission, year, fuel, color, drive}) => {
  return (
    <div className='row s12' style={{ margin: '10px'}}>  
      <div className='col s2 center' style={{ margin: '17px', padding: '5px'}}>
        <div class='card center'> 
          <i className="material-icons small teal-text">title</i>
          <p><strong>{name}</strong></p>
          <p className='teal-text'>Name</p>
        </div>
      </div>
      <Feature value={condition} label='Condition' icon='adjust' />
      <Feature value={body} label='Body Type' icon='directions_car' />
      <Feature value={mileage + ' KMs'} label='Mileage' icon='network_check' />
      <Feature value={transmission} label='Transmission' icon='dns' />
      <Feature value={year} label='Year' icon='date_range' />
      <Feature value={fuel} label='Fuel Type' icon='local_gas_station' />
      <Feature value={color} label='Color' icon='color_lens' />
      <Feature value={drive} label='Drive Type' icon='swap_horiz' />
      <div className='col s2 center' style={{ margin: '17px', padding: '5px'}}> 
        <i className="material-icons small teal-text">money</i>
        <p className='red-text'><strong>{'R ' + price}</strong></p>
        <p className='teal-text'>Price</p>
      </div>
    </div>
  );
};

export default CarDetail;