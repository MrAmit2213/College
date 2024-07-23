const express = require("express");
const multer = require('multer')
const router = express.Router();
const Image = require("../models/gallary");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ROUTE 1 : Upload an Image using: POST "/api/gallary/store-gallaryImage".
router.post('/store-gallaryImage', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Save image information to MongoDB
        const image = new Image({
            imgData: req.file.buffer.toString('base64'), // Convert buffer to base64 string
            description: req.body.description || 'No description',
        });

        await image.save();

        res.status(201).send('Image uploaded successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 2 : Fetch all Images using: GET "/api/gallary/gallaryImage".
router.get('/gallaryImage', async (req, res) => {
    try {
        const images = await Image.find(); 

        res.json(images);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 3 : Delete an Image using: DELETE "/api/gallary/deleteGallaryImage/:id".
router.delete('/deleteGallaryImage/:id', async (req, res) => {
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

// ROUTE 4 : Update an Image using: PUT "/api/gallary/updateGallaryImage/:id".
router.put('/updateGallaryImage/:id', async (req, res) => {
    try {

        const { description } = req.body;
        // Create a new Note Object
        const newImg = {}
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

})



module.exports = router;