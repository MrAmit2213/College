import React from 'react';
import facilitiesContext from './facilitiesContext';
import { useState } from 'react';
import axios from 'axios';

const host = "http://localhost:5000";
const koderma = 'facilities';
const khaga = 'facilitiesKhagha';

const FacilitiesState = (props) => {
    const imagesInitial = []
    const [facilities, setFacilities] = useState(imagesInitial);

    //Get all the images
    const getImages = async () => {
        const response = await axios.get(`${host}/api/${props.campus==='khaga'?khaga:koderma}/facilitiesImage`);
        setFacilities(response.data);
    };

    //Add a new Image
    const addImage = async (image, title, description) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title);
            formData.append('description', description);

            await axios.post(`${host}/api/${props.campus==='khaga'?khaga:koderma}/store-facilitiesImage`, formData, {
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
        axios.delete(`${host}/api/${props.campus==='khaga'?khaga:koderma}/deleteFacilitiesImage/${id}`)
            .then(response => {
                getImages();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
        const newImg = facilities.filter((facilities) => { return facilities._id !== id })
        setFacilities(newImg);
    };

    //Edit an Image
    const editImage = async (id, title, description) => {
        try {
            await axios.put(`${host}/api/${props.campus==='khaga'?khaga:koderma}/updateFacilitiesImage/${id}`, {
                title: title,
                description: description,
            });
            
            // Fetch updated images after saving changes
            getImages();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };
    return (
        <facilitiesContext.Provider value={{ facilities, getImages, addImage, deleteImage, editImage }} >
            {props.children}
        </facilitiesContext.Provider>
    )
}

export default FacilitiesState;
