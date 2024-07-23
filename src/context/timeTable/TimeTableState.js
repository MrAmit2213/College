import React from 'react';
import timeTableContext from './timeTableContext';
import { useState } from 'react';
import axios from 'axios';

const host = "http://localhost:5000";
const koderma = 'timeTable';
const khaga = 'timeTableKhagha';

const TimeTableState = (props) => {
    const imagesInitial = []
    const [timeTable, setTimeTable] = useState(imagesInitial);



    //Get all the images
    const getImages = async () => {
        const response = await axios.get(`${host}/api/${props.campus==='khaga'?khaga:koderma}/timeTable`);
        setTimeTable(response.data);
    };

    //Add a new Image
    const addImage = async (image, description) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('description', description);

            await axios.post(`${host}/api/${props.campus==='khaga'?khaga:koderma}/store-timeTable`, formData, {
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
        axios.delete(`${host}/api/${props.campus==='khaga'?khaga:koderma}/deleteTimeTable/${id}`)
            .then(response => {
                getImages();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
        const newImg = timeTable.filter((timeTable) => { return timeTable._id !== id })
        setTimeTable(newImg);
    };

    //Edit an Image
    const editImage = async (img) => {
        try {
            await axios.put(`${host}/api/${props.campus==='khaga'?khaga:koderma}/updateTimeTable/${img.id}`, { description: img.edescription });

            // Fetch updated images after saving changes
            getImages();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    return (
        <timeTableContext.Provider value={{ timeTable, getImages, addImage, deleteImage, editImage }} >
            {props.children}
        </timeTableContext.Provider>
    )
};

export default TimeTableState;