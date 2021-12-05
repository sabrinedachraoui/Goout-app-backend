const Bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('../Middleware/multer.config')
const nodemailer = require("nodemailer");
const Parent = require("../Models/Parent.model");
module.exports={
    RegisterParent:  async (req,res) => {
        await Parent.init()
        const hashedPass = await Bcrypt.hash(req.body.password,10)
        parent = new Parent({
            Name: req.body.Name,
            Last_name: req.body.Last_name,
            Email: req.body.Email,
            Password: hashedPass,
            Picture:  `${req.protocol}://${req.get('host')}/Uploads/${req.file.filename}`,
            Kids: null,
         })
         try {
            const newParent = await parent.save()
            res.status(201).json({Parent:newParent,
                                reponse: "good"})
        } catch (error) {
            res.status(400).json({reponse: error.message})
        }
    },
    login: async(req,res)=>{
        if (res.Parent == null){
            return res.status(404).send("Utilisateur introuvable")
        }
        try {
            if (await Bcrypt.compare(req.body.Password,res.Parent.Password)){
            const token = jwt.sign({username: res.Parent.Email}, "SECRET")
            if (token){
                res.json({token: token,
                Parent:res.Parent,
                reponse:"good"})
            }
            }else
            res.json({
                Name: req.body.Name,
                Last_name: req.body.Last_name,
                Email: req.body.Email,
                Password: hashedPass,
            })
            
        } catch (error) {
            res.status(400).json({reponse : "mdp incorrect"})
        } 
    },

   
    
    GetParentbymail: async (req,res,next)=>{
        let Parent
        try {
            Parent = await Parent.findOne({Email:req.body.Email})
            if (user == null){
                return res.status(404).json({reponse : "mail non trouve"})
            }
    
        } catch (error) {
            return res.status(500).json({reponse: error.message})
        }
        res.Parent = Parent
        next()
    },
    authentificateToken: (req,res,next) =>{
        const autHeader = req.headers['authorization']
        const token = autHeader && autHeader.split(' ')[1]
    
        if (token == null) return res.status(401).json({reponse:"no token"})
    
        jwt.verify(token, "SECRET", (err,user)=>{
            if (err) return res.status(403).json({reponse:"token invalide"})
            req.user=user
            next()
        })
    
    }
}