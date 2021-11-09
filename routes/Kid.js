const express = require('express');
const router=express.Router;
const Kid=require('../models/Kid');

//Get all
router.get('/',async(req,res) =>{
try {
     const Kids=await Kid.find()
    res.json(Kids);
} catch (error) {
    res.status(500).json({message:error.message})
}
})
//Get one
router.get('/:id',getKid,(req,res) =>{
    res.json(res.Kid)
})
//create one
router.post('/',async(req,res) =>{
    const Kid=new Kid({
        name: req.body.name,
        Last_name: req.body.Last_name,
        Email:req.body.Email,
        Password:req.body.Password,
    })
    try {
        const newKid=await Kid.save();
        res.status(201).json(newKid);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
//Update one attribute
router.patch('/:id',getKid,(req,res) =>{
   if(req.body.name != null){res.Kid.name=req.body.name}  
})
//Delete one
router.delete('/:id',getKid,async(req,res) =>{
    try {
        await res.Kid.remove()
        res.json('Deleted ')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}) 
async function getKid(req,res,next){
    let Kid
    try {
        Kid=await Kid.findById(req.params.id)
        if(Kid==null){
            return res.status(404).json({message:'Cannot Find Kid'})
        }
    } catch (error) { 
        res.status(500).json({message:error.message})
    }
    res.Kid=Kid
    next()
}