var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    news: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('newsKhagha', imageSchema);