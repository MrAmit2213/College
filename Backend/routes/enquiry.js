const express = require('express');
const router = express.Router();
const Enquiry = require('../models/enquiry');
const { validationResult, body } = require('express-validator');

//ROUTE 1 : Fetch all the Enquiry using: GET "/api/enquiry/allEnquiry".
router.get('/allEnquiry', async (req, res) => {

    try {
        const enquiry = await Enquiry.find()
        res.json(enquiry)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' })
    }
})

// ROUTE 2 : Add a new Enquiry using: POST "/api/enquiry/addEnquiry".
router.post('/addEnquiry', [
    body('message', 'message must be atleast 5 letters').isLength({ min: 5 },)
], async (req, res) => {

    try {
        const { name, mail, contact, subject, message } = req.body;
        // if errors occur, return bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const enquiry = new Enquiry({
            name, mail, contact, subject, message
        })
        const savedEnquiry = await enquiry.save()

        res.json(savedEnquiry)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }
})

//ROUTE 3 : Delete an existing Enquiry using: DELETE "/api/enquiry/addEnquiry".
router.delete('/deleteEnquiry/:id', async (req, res) => {
    try {

        // Find the note to be updated and update it
        let enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).send("Not Found!");
        }

        enquiry = await Enquiry.findByIdAndDelete(req.params.id)
        res.json({ "Success": "The note has been deleted", enquiry: enquiry });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }

});

module.exports = router;