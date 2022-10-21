const mongoose = require("mongoose");

const mongoURI = ""
function connectToMongo(){
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoDB successfully")
    })
}

module.exports = connectToMongo
