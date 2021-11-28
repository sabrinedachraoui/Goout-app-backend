const Bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('../Middleware/multer-config')
const nodemailer = require("nodemailer");
const Parent = require("../Models/Parent.model");
module.exports={
    RegisterParent: async function(req,res){
        await Parent.init()
        const hashedPass = await Bcrypt.hash(req.body.Password,10)
        const parent = new Parent({
            Name: req.body.Name,
            last_name: req.body.last_name,
            Email: req.body.Email,
            Password: hashedPass,
            Picture: `${req.protocol}://${req.get('host')}/Uploads/${req.file.filename}`,
            Kids: null,
         })
         try {
            const newParent = await parent.save()
            res.status(201).json({parent:newParent,
                                reponse: "good"})
        } catch (error) {
            res.status(400).json({reponse: error.message})
        }
   }
    
}