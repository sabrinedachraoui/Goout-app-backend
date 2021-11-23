const mongoose=require('mongoose');

const LocationSchema=new mongoose.Schema({

    Longe:{
        type: int,
        required: true
    },

    Latt:{
        type: int,
        required:true
    },



});
module.exports=mongoose.model('Location',LocationSchema)