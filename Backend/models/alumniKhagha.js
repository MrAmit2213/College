var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    imgData:String,
    name: String,
    batch: String,
    marks: String
});

module.exports = new mongoose.model('alumniKhaghaImage', imageSchema);