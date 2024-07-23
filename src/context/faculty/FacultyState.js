import React from 'react';
import facultyContext from './facultyContext';
import { useState } from 'react';
import axios from 'axios';

const host = "http://localhost:5000";
const koderma = 'faculty';
const khaga = 'facultyKhagha';

const FacultyState = (props) => {
    const imagesInitial = []
    const [faculty, setFaculty] = useState(imagesInitial);

    //Get all the images
    const getImages = async () => {
        const response = await axios.get(`${host}/api/${props.campus==='khaga'?khaga:koderma}/facultyImage`);
        setFaculty(response.data);
    };

    //Add a new Image
    const addImage = async (image, name, designation, contact, mail, address, lastDegree) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('designation', designation);
            formData.append('contact', contact);
            formData.append('mail', mail);
            formData.append('address', address);
            formData.append('lastDegree', lastDegree);

            await axios.post(`${host}/api/${props.campus==='khaga'?khaga:koderma}/store-facultyImage`, formData, {
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
        axios.delete(`${host}/api/${props.campus==='khaga'?khaga:koderma}/deleteFacultyImage/${id}`)
            .then(response => {
                getImages();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
        const newImg = faculty.filter((faculty) => { return faculty._id !== id })
        setFaculty(newImg);
    };

    //Edit an Image
    const editImage = async (id, ename, edesignation, econtact, email, eaddress, elastDegree) => {
        try {
            await axios.put(`${host}/api/${props.campus==='khaga'?khaga:koderma}/updateFacultyImage/${id}`, {
                name: ename,
                designation: edesignation,
                contact: econtact,
                mail: email,
                address: eaddress,
                lastDegree: elastDegree
            });
            
            // Fetch updated images after saving changes
            getImages();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };
    return (
        <facultyContext.Provider value={{ faculty, getImages, addImage, deleteImage, editImage }} >
            {props.children}
        </facultyContext.Provider>
    )
}

export default FacultyState
