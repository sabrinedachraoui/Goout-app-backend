const express = require('express');
const Tache = require('../models/Tache');
const router=express.Router;
const Tache=require('../models/Tache');

//Get all
router.get('/',async(req,res) =>{
try {
     const Tache=await Tache.find()
    res.json(tache);
} catch (error) {
    res.status(500).json({message:error.message})
}
})
//Get one
router.get('/:id',getTache,(req,res) =>{
    res.json(res.Tache)
})
//create one
router.post('/',async(req,res) =>{
    const Tache=new Tache({
        name: req.body.name,
        Last_name: req.body.Last_name,
        Email:req.body.Email,
        Password:req.body.Password,
    })
    try {
        const newTache=await Tache.save();
        res.status(201).json(newTache);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
//Update one attribute
router.patch('/:id',getTache,(req,res) =>{
   if(req.body.name != null){res.Tache.name=req.body.name}  
})
//Delete one
router.delete('/:id',getTache,async(req,res) =>{
    try {
        await res.Tache.remove()
        res.json('Deleted ')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}) 
async function getTache(req,res,next){
    let Tache
    try {
        Tache=await Tache.findById(req.params.id)
        if(Tache==null){
            return res.status(404).json({message:'Cannot Find Tache'})
        }
    } catch (error) { 
        res.status(500).json({message:error.message})
    }
    res.Tache=Tache
    next()
}