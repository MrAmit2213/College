const express = require("express");
const multer = require('multer')
const router = express.Router();
const Image = require("../models/alumni");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//ROUTE 1 : Upload an image using: POST "/api/alumni/store-alumniImage".
router.post('/store-alumniImage', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Save image information to MongoDB
        const image = new Image({
            imgData: req.file.buffer.toString('base64'), // Convert buffer to base64 string
            name: req.body.name || 'No name',
            batch: req.body.batch || 'No batch',
            marks: req.body.marks || 'No marks',
        });

        await image.save();

        res.status(201).send('Image uploaded successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 2 : Fetch all images using: GET "/api/alumni/alumniImage".
router.get('/alumniImage', async (req, res) => {
    try {
        const images = await Image.find(); 

        res.json(images);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 3 : Delete an image using: DELETE "/api/alumni/deleteAlumniImage/:id".
router.delete('/deleteAlumniImage/:id', async (req, res) => {
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

// ROUTE 4 : Update an existing Note using: PUT "/api/alumni/updateAlumniImage/:id".
router.put('/updateAlumniImage/:id', async (req, res) => {
    try {

        const { name, batch, marks } = req.body;
        // Create a new Note Object
        const newImg = {}
        if (name) {
            newImg.name = name
        }
        if (batch) {
            newImg.batch = batch
        }
        if (marks) {
            newImg.marks = marks
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