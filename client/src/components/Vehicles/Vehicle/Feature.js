import React from 'react';

const Feature = ({value, label, icon}) => {
  return (
    <div className='col s2 center' style={{ margin: '17px', padding: '5px'}}>
      <div className='card'> 
        <i className="material-icons small teal-text">{icon}</i>
        <p><strong>{value}</strong></p>
        <p className='teal-text'>{label}</p>
      </div>
    </div>
  );
};

export default Feature;