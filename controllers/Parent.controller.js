const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("../Middleware/multer.config");
const nodemailer = require("nodemailer");
const Parent = require("../models/Parent.model");
const Kid = require("../models/Kid.model");
const Task = require("../models/Task.model")

module.exports = {
  Getall: async(req,res)=>{
    const users = await Parent.find()
                              

    if (users) {
        res.status(200).json({ users, message: "success" })
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
      Email: req.body.Email,
      Password: hashedPass,
    });
    console.log(parent)
    try {
      parent.save();
      res.status(201).json({ parent, reponse: "good" });
    } catch (error) {
      res.status(400).json({ reponse: error.message });
    }

  },
  login: async (req, res) => {
    parent = await Parent.findOne({ Email: req.body.Email }).populate('Kids');
    try {
      console.log(req.body.Password);
      console.log(parent.Password);
      
      if (await Bcrypt.compare(req.body.Password, parent.Password)) {
        const token = jwt.sign({ Email: parent.Email }, "SECRET");
        if (token) {
          res.json({ token, Parent: parent, reponse: "good" });
        }
      } else {
        res.status(400).json({ reponse: "mdp incorrect" });
      }
    } catch (error) {
      res.status(500).json({ reponse: error });
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
      Myparent: req.params._id
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
    
  },
  motDePasseOublie: async (req, res) => {
    const codeDeReinit = req.body.codeDeReinit
    const utilisateur = await Utilisateur.findOne({ "email": req.body.email })
  
    if (utilisateur) {
      // token creation
      const token = jwt.sign({ _id: utilisateur._id, email: utilisateur.email }, config.token_secret, {
        expiresIn: "3600000", // in Milliseconds (3600000 = 1 hour)
      })
  
      envoyerEmailReinitialisation(req.body.email, codeDeReinit)
  
      res.status(200).send({ "message": "L'email de reinitialisation a été envoyé a " + utilisateur.email })
    } else {
      res.status(404).send({ "message": "Utilisateur innexistant" })
    }
  },
  
   envoyerEmailReinitialisation: async (email, codeDeReinit)=> {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    })
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
        console.log("Server not ready")
      } else {
        console.log("Server is ready to take our messages")
      }
    })
  
    const mailOptions = {
      from: '',
      to: email,
      subject: 'Reinitialisation de votre mot de passe ',
      html: "<h3>Vous avez envoyé une requete de reinitialisation de mot de passe </h3><p>Entrez ce code dans l'application pour proceder : <b style='color : blue'>" + codeDeReinit + "</b></p>"
    }
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent : ' + info.response)
      }
    })
  },
  SigninwithSocialmedia: async (req, res) => {

    const { Email, Name } = req.body
  
    if (Email === "") {
      res.status(403).send({ message: "error please provide an email" })
    } else {
      var parent = await Parent.findOne({ Email })
      if (parent) {
        console.log("user exists, loging in")
      } else {
        console.log("user does not exists, creating an account")
  
        theparent = new Parent()
  
        theparent.Name = Name
        theparent.Email = Email
        theparent.Last_Name = null
        theparent.Password = null
        theparent.save()
      }
      // token creation not available yet
      res.status(201).send({ message: "success", theparent })
    }
  }
};
