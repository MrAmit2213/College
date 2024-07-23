const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/school";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    console.log("Successfull")
}

module.exports = connectToMongo;