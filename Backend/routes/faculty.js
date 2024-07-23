const express = require("express");
const multer = require('multer')
const router = express.Router();
const Image = require("../models/faculty");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//ROUTE 1 : Upload an image using: POST "/api/faculty/store-facultyImage".
router.post('/store-facultyImage', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Save image information to MongoDB
        const image = new Image({
            imgData: req.file.buffer.toString('base64'), // Convert buffer to base64 string
            name: req.body.name || 'no name',
            designation: req.body.designation || 'no designation',
            contact: req.body.contact || 'no contact',
            mail: req.body.mail || 'no mail',
            address: req.body.address || 'no address',
            lastDegree: req.body.lastDegree || 'no lastDegree',
        });

        await image.save();

        res.status(201).send('Image uploaded successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 2 : Fetch all images using: GET "/api/faculty/facultyImage".
router.get('/facultyImage', async (req, res) => {
    try {
        const images = await Image.find(); 

        res.json(images);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 3 : Delete an image using: DELETE "/api/faculty/deleteFacultyImage/:id".
router.delete('/deleteFacultyImage/:id', async (req, res) => {
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

// ROUTE 4 : Update an existing Note using: PUT "/api/faculty/updateFacultyImage/:id".
router.put('/updateFacultyImage/:id', async (req, res) => {
    try {

        const { name, designation, contact, mail, address, lastDegree } = req.body;
        // Create a new Note Object
        const newImg = {}
        if (name) {
            newImg.name = name
        }
        if (designation) {
            newImg.designation = designation
        }
        if (contact) {
            newImg.contact = contact
        }
        if (mail) {
            newImg.mail = mail
        }
        if (address) {
            newImg.address = address
        }
        if (lastDegree) {
            newImg.lastDegree = lastDegree
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