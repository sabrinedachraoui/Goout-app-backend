const Parent = require("../models/Parent.model");
const Kid = require("../models/Kid.model");
const Task = require("../models/Task.model");

module.exports={
Getkids: async(req,res)=>{
    try {    const kids = await Kid.find({Myparent:req.params._id})
           res.json({kids:kids})
        
    } catch (error) {
  res.status(500).json(error)     
    } 

}

};