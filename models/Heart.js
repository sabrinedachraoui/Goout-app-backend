const mongoose=require('mongoose');

const HeartSchema=new mongoose.Schema({
    Realtime:{
        type: int,
        required:true,
    },
    increments:{
        type:int,
        required:true,
    },
    average:{
        type:int,
        required:true,
    },

});
module.exports=mongoose.model('Kid',KidSchema)