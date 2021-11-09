const mongoose=require('mongoose');

const KidSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    Last_name:{
        type: String,
        required:true
    },
    Email:{
        type: Email,
        required: true
    },
    Password:{
        type: Password,
        required: true
    },
    

});
module.exports=mongoose.model('Kid',KidSchema)