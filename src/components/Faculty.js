import React from 'react';
import FacultyCard from './FacultyCard';

const Faculty = (props) => {

  return (
    <div>
      <FacultyCard For={props.campus==='khaga'?'facultyKhagha':'faculty'} Function='facultyImage' title='Our Faculties' />
    </div>
  )
}

export default Faculty;
