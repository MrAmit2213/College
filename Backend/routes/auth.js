const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Hellooooo';

//ROUTE 1 : Create a user using: POST "/api/auth/createUser". No login required.
router.post('/createUser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password too small').isLength({ min: 5 })
], async (req, res) => {
    success = false;
    // if errors occur, return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {

        // check if the user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'The email already exists' })
        }
        //Create a new User
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            address: req.body.address,
            campus: req.body.campus,
            role: req.body.role,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' })
    }

})

//ROUTE 2 : Authenticate a User using: POST "/api/auth/login". No login required.
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    success = false;
    // check if the user with this email already exists
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email does not exists" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Incorrect Password" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken, campus: user.campus, role: user.role });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry, some error occured' })
    }
});

//ROUTE 3 : Get logged in User's Details using: POST "/api/auth/getUser". Login required.
router.post('/getUser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Sorry, some error occured')
    }
})
module.exports = router

//ROUTE 4 : Fetch all Admins using: GET "/api/auth/getAdmins".
router.get('/getUser', async (req, res) => {
    try {
        const admin = await User.find().select("-password");

        res.json(admin);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 5 : Delete an Admin using: DELETE "/api/auth/deleteAdmin/:id".
router.delete('/deleteAdmin/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("Not Found!");
        }

        user = await User.findByIdAndDelete(req.params.id)
        res.json({ "Success": "The admin has been deleted", user: user });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }

});

//ROUTE 6 : Update an existing Admin using: PUT "/api/auth/updateAdmin/:id".
router.put('/updateUser/:id', async (req, res) => {
    try {

        const { name, email, contact, address } = req.body;
        // Create a new Note Object
        const newImg = {}
        if (name) {
            newImg.name = name
        }
        if (email) {
            newImg.email = email
        }
        if (contact) {
            newImg.contact = contact
        }
        if (address) {
            newImg.address = address
        }

        // Find the note to be updated and update it
        let image = await User.findById(req.params.id);
        if (!image) {
            return res.status(404).send("Not Found!");
        }

        image = await User.findByIdAndUpdate(req.params.id, { $set: newImg }, { new: true })
        res.json({ image });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }

});