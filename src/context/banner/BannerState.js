import React from 'react';
import BannerContext from './BannerContext';
import { useState } from 'react';
import axios from 'axios';

const host = "http://localhost:5000";
const koderma = 'banner';
const khaga = 'bannerKhagha';

const BannerState = (props) => {
    const imagesInitial = []
    const [banner, setBanner] = useState(imagesInitial);



    //Get all the images
    const getImages = async () => {
        const response = await axios.get(`${host}/api/${props.campus==='khaga'?khaga:koderma}/bannerImage`);
        setBanner(response.data);
    };

    //Add a new Image
    const addImage = async (image, description) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('description', description);

            await axios.post(`${host}/api/${props.campus==='khaga'?khaga:koderma}/store-bannerImage`, formData, {
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
        axios.delete(`${host}/api/${props.campus==='khaga'?khaga:koderma}/deleteBannerImage/${id}`)
            .then(response => {
                getImages();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
            });
        const newImg = banner.filter((banner) => { return banner._id !== id })
        setBanner(newImg);
    };

    //Edit an Image
    const editImage = async (img) => {
        try {
            await axios.put(`${host}/api/${props.campus==='khaga'?khaga:koderma}/updateBannerImage/${img.id}`, { description: img.edescription });

            // Fetch updated images after saving changes
            getImages();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    return (
        <BannerContext.Provider value={{ banner, getImages, addImage, deleteImage, editImage }} >
            {props.children}
        </BannerContext.Provider>
    )
};

export default BannerState;