var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    imgData: String,
    
    name:{
        type: String,
        required : true
    },
    designation:{
        type: String,
        required : true
    },
    contact:{
        type: String,
        required : true
    },
    mail:{
        type: String,
        required : true
    },
    address:{
        type: String,
        required : true
    },
    lastDegree:{
        type: String,
        required : true
    },
});

module.exports = new mongoose.model('facultyKhaghaImage', imageSchema);