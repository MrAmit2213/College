import React from 'react';
import AlumniCard from './AlumniCard';

const Alumni = (props) => {
  
  return (
    <>
        <AlumniCard title='Our Alumni' For={props.campus?'alumniKhagha':'alumni'} Function='alumniImage' />
    </>
  )
}

export default Alumni;
