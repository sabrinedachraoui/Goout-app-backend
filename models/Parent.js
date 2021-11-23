const mongoose=require('mongoose');

const ParentSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    Last_name:{
        type: String,
        required:true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },

});
module.exports=mongoose.model('Parent',ParentSchema)