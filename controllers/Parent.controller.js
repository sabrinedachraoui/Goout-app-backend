const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("../Middleware/multer.config");
const nodemailer = require("nodemailer");
const Parent = require("../models/Parent.model");
const Kid = require("../models/Kid.model");
const Task = require("../models/Task.model")

module.exports = {
  Getall: async(req,res)=>{
    const users = await Parent.find().populate("Kids").exec()
                              

    if (users) {
        res.status(200).send({ users, message: "success" })
    } else {
        res.status(403).send({ message: "fail" })
    }
    
  },
  Profile: async(req,res) => {
    const users = await Parent.findById(req.params._id)
                              

    if (users) {
        res.status(200).send({ users, message: "success" })
    } else {
        res.status(403).send({ message: "fail" })
    }
    
  },
  RegisterParent: async (req, res) => {
    await Parent.init();
    console.log(req.body)
    const hashedPass = await Bcrypt.hash(req.body.Password, 10);   
    parent = new Parent({
      Name: req.body.Name,
      Last_name: req.body.Last_name,
      Email: req.body.Email,
      Password: hashedPass,
    });
    try {
      const newParent = await parent.save();
      res.status(201).json({ Parent: newParent, reponse: "good" });
    } catch (error) {
      res.status(400).json({ reponse: error.message });
    }

  },
  login: async (req, res) => {
    if (res.Parent == null) {
      return res.status(404).send("Utilisateur introuvable");
    }
    try {
      if (await Bcrypt.compare(req.body.Password, res.Parent.Password)) {
        const token = jwt.sign({ Email: res.Parent.Email }, "SECRET");
        if (token) {
          res.json({ token, Parent: res.Parent, reponse: "good" });
        }
      } else {
        res.status(400).json({ reponse: "mdp incorrect" });
      }
    } catch (error) {
      res.status(400).json({ reponse: error });
    }
  },
  GetallKids: async(req,res)=>{
    const users = await Parent.find({})

    if (users) {
        res.status(200).send({ users, message: "success" })
    } else {
        res.status(403).send({ message: "fail" })
    }
  },
  GetParentbymail: async (req, res, next) => {
    let parent;
    try {
      parent = await Parent.findOne({ Email: req.body.Email });
      if (parent == null) {
        return res.status(404).json({ reponse: "mail non trouve" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ reponse: error.message });
    }
    res.Parent = parent;
    console.log(parent)
    next();
  },
  authentificateToken: (req, res, next) => {
    const autHeader = req.headers["authorization"];
    const token = autHeader && autHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ reponse: "no token" });

    jwt.verify(token, "SECRET", (err, user) => {
      if (err) return res.status(403).json({ reponse: "token invalide" });
      req.user = user;
      next();
    });
  },
  RegisterKid: async (req, res) => {
    await Kid.init();
    const hashedPass = await Bcrypt.hash(req.body.Password, 10);
    tfol = new Kid({
      Name: req.body.Name,
      Last_name: req.body.Last_name,
      Email: req.body.Email,
      Password: hashedPass,
    });
    const parent = await Parent.findById({_id:req.params._id});
    try {
      parent.Kids.push(tfol)
      parent.save()
      const newkid = await tfol.save();
      res.status(201).json({ tfol: newkid, reponse: "good" });
    } catch (error) {
      res.status(400).json({ reponse: error.message });
    }
    
  },
  AddTask: async (req,res) =>{
    await Task.init();
    thetask = new Task({
    Name: req.body.Name,
    Description : req.body.Description
    })
    const tfol = await Kid.findById({_id:req.params._id})
    try {
      tfol.Tasks.push(thetask)
      tfol.save()
      const newtask = await thetask.save();
      res.status(201).json({ thetask: newtask, reponse: "good" });
    } catch (error) {
      res.status(400).json({ reponse: error.message });
    }
  },
  changeimage: async (req,res)=>{
    
  }

};
