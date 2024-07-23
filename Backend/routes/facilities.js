const express = require("express");
const multer = require('multer')
const router = express.Router();
const Image = require("../models/facilities");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//ROUTE 1 : Upload an image using: POST "/api/facilities/store-facilitiesImage".
router.post('/store-facilitiesImage', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Save image information to MongoDB
        const image = new Image({
            imgData: req.file.buffer.toString('base64'), // Convert buffer to base64 string
            title: req.body.title || 'no title',
            description: req.body.description || 'no description',
        });

        await image.save();

        res.status(201).send('Image uploaded successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 2 : Fetch all images using: GET "/api/facilities/facilitiesImage".
router.get('/facilitiesImage', async (req, res) => {
    try {
        const images = await Image.find(); 

        res.json(images);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 3 : Delete an image using: DELETE "/api/facilities/deleteFacilitiesImage/:id".
router.delete('/deleteFacilitiesImage/:id', async (req, res) => {
    try {
        
        // Find the note to be updated and update it
        let image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send("Not Found!");
        }

        image = await Image.findByIdAndDelete(req.params.id)
        res.json({ "Success" : "The image has been deleted", image: image });
    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }

});

// ROUTE 4 : Update an existing Note using: PUT "/api/facilities/updateFacilitiesImage/:id".
router.put('/updateFacilitiesImage/:id', async (req, res) => {
    try {

        const { title, description } = req.body;
        // Create a new Note Object
        const newImg = {}
        if (title) {
            newImg.title = title
        }
        if (description) {
            newImg.description = description
        }

        // Find the note to be updated and update it
        let image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send("Not Found!");
        }

        image = await Image.findByIdAndUpdate(req.params.id, { $set: newImg }, { new: true })
        res.json({ image });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }

});

module.exports = router;