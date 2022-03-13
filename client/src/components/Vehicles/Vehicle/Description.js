import React from 'react';

const Description = ({ description}) => {
  return (
    <div className='center' style={{ paddingBottom: '20px', marginTop: '0px', marginBottom: '0px'}}>
      <p>{description}</p>
    </div>
  );
};

export default Description;