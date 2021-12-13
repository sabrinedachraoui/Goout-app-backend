const Parent = require("../models/Parent.model");
const Kid = require("../models/Kid.model");
const Task = require("../models/Task.model")

module.exports{
    Gettasks: async (req,res) =>{
        const kid = await Kid.findById({_id: req.params._id}).populate("Tasks").exec()

    }
    if (kid) {
        res.status(200).send({ kid, message: "success" })
    } else {
        res.status(403).send({ message: "fail" })
    }
}