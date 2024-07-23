var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    imgData: String,
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
});

module.exports = new mongoose.model('facilitiesImage', imageSchema);