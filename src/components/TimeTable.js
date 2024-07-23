import React from 'react';
import ImageCard from './ImageCard';

const TimeTable = (props) => {
  return (
    <div>
      <ImageCard For={props.campus?'timeTableKhagha':'timeTable'} Function='timeTable'  title='Time Tables' />
    </div>
  )
}

export default TimeTable;