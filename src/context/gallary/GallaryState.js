import React from 'react';
import gallaryContext from './gallaryContext';
import { useState } from 'react';
import axios from 'axios';

const host = "http://localhost:5000";
const koderma = 'gallary';
const khaga = 'gallaryKhagha';

const GallaryState = (props) => {
    const imagesInitial = []
    const [gallary, setGallary] = useState(imagesInitial);



    //Get all the images
    const getImages = async () => {
        const response = await axios.get(`${host}/api/${props.campus==='khaga'?khaga:koderma}/gallaryImage`);
        setGallary(response.data);
    };

    //Add a new Image
    const addImage = async (image, description) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('description', description);

            await axios.post(`${host}/api/${props.campus==='khaga'?khaga:koderma}/store-gallaryImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await getImages();
        } catch (error) {
            console.error('Error adding image:', error);
        }

    };

    //Delete an Image
    const deleteImage = (id) => {
        axios.delete(`${host}/api/${props.campus==='khaga'?khaga:koderma}/deleteGallaryImage/${id}`)
            .then(response => {
                getImages();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
        const newImg = gallary.filter((gallary) => { return gallary._id !== id })
        setGallary(newImg);
    };

    //Edit an Image
    const editImage = async (img) => {
        try {
            await axios.put(`${host}/api/${props.campus==='khaga'?khaga:koderma}/updateGallaryImage/${img.id}`, { description: img.edescription });

            // Fetch updated images after saving changes
            getImages();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    return (
        <gallaryContext.Provider value={{ gallary, getImages, addImage, deleteImage, editImage }} >
            {props.children}
        </gallaryContext.Provider>
    )
};

export default GallaryState;