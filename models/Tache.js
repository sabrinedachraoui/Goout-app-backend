const mongoose=require('mongoose');

const TacheSchema=new mongoose.Schema({
    Titre:{
        type: String,
        required: true

    },
    
    Kids:{
        type: int,
        required: true

    },

    Parent:{
        type: int,
        required: true

    },


    
    },
    

);
module.exports=mongoose.model('Tache',TacheSchema)