const mongoose = require("mongoose");
//define a new data object

const UserSchema = new mongoose.Schema({
        name: { type: String },
        email: { type: String },
        address: { type: String },
        password: { type: String },
        role: { type: String },
        Kids:[{
                type: mongoose.SchemaTypes.ObjectId, ref: 'Kids',
        }]
        
});

//we want to export this file to the server so it can see the schema
//the data is the student we made
module.exports = mongoose.model("parent", UserSchema);