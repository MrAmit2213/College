var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    mail:{
        type: String,
        required : true
    },
    contact:{
        type: String,
        required : true
    },
    subject:{
        type: String,
        required : true
    },
    message:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('enquiry', imageSchema);