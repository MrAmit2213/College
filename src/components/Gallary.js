import React from 'react';
import ImageCard from './ImageCard';

const Gallary = (props) => {
  return (
    <div>
      <ImageCard For={props.campus?'gallaryKhagha':'gallary'} Function='gallaryImage'  title='Some Pictures of Our College' />
    </div>
  )
}

export default Gallary;
