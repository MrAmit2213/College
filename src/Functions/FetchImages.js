import { useState, useEffect } from 'react';
import axios from 'axios';
const host = 'http://localhost:5000';

const FetchImages = (For, Function) => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${host}/api/${For}/${Function}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, []);

  return { images, fetchImages };
};

export default FetchImages;
