const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true 
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true     
    },
    password:{
        type:String,
        require:true,
        trim:true 
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
module.exports = mongoose.model("user", userSchema)