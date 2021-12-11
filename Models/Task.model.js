const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required:true,
    },
    Status:{
        type: String,
        default: "doing", 
    }
});
module.exports=mongoose.model('Task',TaskSchema)