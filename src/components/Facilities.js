import React from 'react';
import FacilityCard from './FacilityCard';

const Facilities = (props) => {
  return (
    <div>
        <FacilityCard title='Infrastructure' For={props.campus?'facilitiesKhagha':'facilities'} Function='facilitiesImage'/>
      </div>
  )
}

export default Facilities;
