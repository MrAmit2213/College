var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    imgData:String,
    description: String
});

module.exports = new mongoose.model('timeTableKhagha', imageSchema);