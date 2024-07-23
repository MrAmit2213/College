const express = require("express");
const multer = require('multer')
const router = express.Router();
const Image = require("../models/banner");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//ROUTE 1 : Upload an image using: POST "/api/banner/store-bannerImage".
router.post('/store-bannerImage', upload.single('image'), async (req, res) => {
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

//ROUTE 2 : Fetch all images using: GET "/api/banner/bannerImage".
router.get('/bannerImage', async (req, res) => {
    try {
        const images = await Image.find(); 

        res.json(images);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 3 : Delete an image using: DELETE "/api/banner/deleteBannerImage/:id".
router.delete('/deleteBannerImage/:id', async (req, res) => {
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

// ROUTE 4 : Update an existing Note using: PUT "/api/banner/updateBannerImage/:id".
router.put('/updateBannerImage/:id', async (req, res) => {
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