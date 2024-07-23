const express = require('express');
const router = express.Router();
const News = require('../models/newsKhagha');
const { validationResult, body } = require('express-validator');

//ROUTE 1 : Fetch all the news using: GET "/api/news/allNews".
router.get('/allNews', async (req, res) => {

    try {
        const news = await News.find()
        res.json(news)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' })
    }
})

// ROUTE 2 : Add a new News using: POST "/api/news/addNews".
router.post('/addNews', [
    body('news', 'description must be atleast 5 letters').isLength({ min: 5 },)
], async (req, res) => {

    try {
        const { title, news } = req.body;
        // if errors occur, return bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newss = new News({
            title, news
        })
        const savedNews = await newss.save()

        res.json(savedNews)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }
})

//ROUTE 3 : Update an existing News using: PUT "/api/news/updateNews/:id".
router.put('/updateNews/:id', async (req, res) => {
    try {

        const { title, news } = req.body;
        // Create a new Note Object
        const newNews = {}
        if (title) {
            newNews.title = title
        }
        if (news) {
            newNews.news = news
        }

        // Find the note to be updated and update it
        let newz = await News.findById(req.params.id);
        if (!newz) {
            return res.status(404).send("Not Found!");
        }

        newz = await News.findByIdAndUpdate(req.params.id, { $set: newNews }, { new: true })
        res.json({ title, news });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }

});


//ROUTE 4 : Delete an existing News using: DELETE "/api/news/deleteNews".
router.delete('/deleteNews/:id', async (req, res) => {
    try {

        // Find the note to be updated and update it
        let news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send("Not Found!");
        }

        news = await News.findByIdAndDelete(req.params.id)
        res.json({ "Success": "The note has been deleted", news: news });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Sorry,some error occured' });
    }

});

module.exports = router;