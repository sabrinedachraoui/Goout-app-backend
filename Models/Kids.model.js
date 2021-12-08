const mongoose=require('mongoose');

const KidSchema=new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Last_name:{
        type: String,
        required:true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    Password:{type: String},
    Location:[{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Location',
    }],
    health:[{
        type: mongoose.SchemaTypes.ObjectId, ref: 'health',
    }],
});
module.exports=mongoose.model('Kids',KidSchema)