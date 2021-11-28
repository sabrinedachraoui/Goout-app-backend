const mongoose=require('mongoose');

const ParentSchema=new mongoose.Schema({
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
        match: /.+\@.+\..+/
    },
    Password:{
        type: String,
        required: true,
    },
    picture:{
        type: String,
    },
    Kids:[{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Kids',
    }]
    

});
module.exports=mongoose.model('Parent',ParentSchema)