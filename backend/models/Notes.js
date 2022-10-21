const mongoose  = require("mongoose");
const {Schema} = mongoose

const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
        trim:true 
    },
    description:{
        type:String,
        require:true,
        trim:true     
    },
    tags:{
        type:String,
        default:"General",
        trim:true 
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
module.exports = mongoose.model("notes", notesSchema)