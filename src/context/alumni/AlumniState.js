import React from 'react';
import alumniContext from './alumniContext';
import { useState } from 'react';
import axios from 'axios';

const host = "http://localhost:5000";
const koderma = 'alumni';
const khaga = 'alumniKhagha';

const AlumniState = (props) => {
    const imagesInitial = []
    const [alumni, setAlumni] = useState(imagesInitial);

    //Get all the images
    const getImages = async () => {
        const response = await axios.get(`${host}/api/${props.campus==='khaga'?khaga:koderma}/alumniImage`);
        setAlumni(response.data);
    };

    //Add a new Image
    const addImage = async (image, name, batch, marks) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('batch', batch);
            formData.append('marks', marks);
            
            await axios.post(`${host}/api/${props.campus==='khaga'?khaga:koderma}/store-alumniImage`, formData, {
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
        axios.delete(`${host}/api/${props.campus==='khaga'?khaga:koderma}/deleteAlumniImage/${id}`)
            .then(response => {
                getImages();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
        const newImg = alumni.filter((alumni) => { return alumni._id !== id })
        setAlumni(newImg);
    };

    //Edit an Image
    const editImage = async (id, name, batch, marks) => {
        try {
            await axios.put(`${host}/api/${props.campus==='khaga'?khaga:koderma}/updateAlumniImage/${id}`, {
                name: name,
                batch: batch,
                marks: marks,
            });

            // Fetch updated images after saving changes
            getImages();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };
    return (
        <alumniContext.Provider value={{ alumni, getImages, addImage, deleteImage, editImage }} >
            {props.children}
        </alumniContext.Provider>
    )
}

export default AlumniState;
