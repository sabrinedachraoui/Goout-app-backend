const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("../Middleware/multer.config");
const nodemailer = require("nodemailer");
const Parent = require("../models/Parent.model");
const Kid = require("../models/Kid.model");

module.exports = {
  Getall: async(req,res)=>{
    const users = await Parent.find().populate().exec()
                              

    if (users) {
        res.status(200).send({ users, message: "success" })
    } else {
        res.status(403).send({ message: "fail" })
    }
    
  },
  RegisterParent: async (req, res) => {
    await Parent.init();
    const hashedPass = await Bcrypt.hash(req.body.Password, 10);
    parent = new Parent({
      Name: req.body.Name,
      Last_name: req.body.Last_name,
      Email: req.body.Email,
      Password: hashedPass,
      /*Picture: `${req.protocol}://${req.get("host")}/Uploads/${
        req.file.filename
      }`,*/
      Kids: null,
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
    kid = new Kid({
      Name: req.body.Name,
      Last_name: req.body.Last_name,
      Email: req.body.Email,
      Password: hashedPass,
    });
    try {
      const newkid = await kid.save();
      res.status(201).json({ kid: newkid, reponse: "good" });
    } catch (error) {
      res.status(400).json({ reponse: error.message });
    }
  },
   envoyerEmailDeConfirmation: async(email, token)=> {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'theemail@gmail.com',
        pass: 'the password'
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
  
    const urlDeConfirmation = "http://localhost:3000/api.chicky.com/utilisateur/confirmation/" + token
  
    const mailOptions = {
      from: 'Goout@gmail.com',
      to: email,
      subject: 'Confirmation de votre email',
      html: "<h3>Veuillez confirmer votre email en cliquant sur ce lien : </h3><a href='" + urlDeConfirmation + "'>Confirmation</a>"
    }
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  },
  

};
