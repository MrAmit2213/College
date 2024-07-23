const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    contact:{
        type: String,
        required : true,
    },
    address:{
        type: String,
    },
    password:{
        type: String,
        required : true
    },
    campus:{
        type: String
    },
    role:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('user', userSchema);