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
    Myparent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Parent'},
    isverified:{
        type: Boolean,
        default : false,
    },
    Tasks:[{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Task',
    }],
});
module.exports=mongoose.model('Kid',KidSchema)