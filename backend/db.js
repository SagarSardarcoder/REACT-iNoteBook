const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://Sagar-functionup:radhaswami123@cluster0.7xlsi.mongodb.net/inotebooks?retryWrites=true&w=majority"
function connectToMongo(){
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoDB successfully")
    })
}

module.exports = connectToMongo
