const mongoose=require('mongoose');

const ParentSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    Last_name:{
        type: String,
        required:true,
    },
    Email:{
        type: Email,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
});
module.exports=mongoose.model('Kids',KidSchema)