import React from 'react';

const customPassword = ({input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label style={{ fontSize: '24px' }}>{label}</label>
      <input {...input} type='password' style={{ marginBottom: '5px' }}></input>
      <div className='red-text' style={{ marginBottom: '10px' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default customPassword;