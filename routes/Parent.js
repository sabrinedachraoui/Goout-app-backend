const express = require('express');
const router=express.Router;
const Parent=require('../models/Parent');

//Get all
router.get('/',async(req,res) =>{
try {
     const parents=await Parent.find()
    res.json(parents);
} catch (error) {
    res.status(500).json({message:error.message})
}
})
//Get one
router.get('/:id',getParent,(req,res) =>{
    res.json(res.parent)
})
//create one
router.post('/',async(req,res) =>{
    const Parent=new Parent({
        name: req.body.name,
        Last_name: req.body.Last_name,
        Email:req.body.Email,
        Password:req.body.Password,
    })
    try {
        const newParent=await Parent.save();
        res.status(201).json(newParent);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
//Update one attribute
router.patch('/:id',getParent,(req,res) =>{
   if(req.body.name != null){res.parent.name=req.body.name}  
})
//Delete one
router.delete('/:id',getParent,async(req,res) =>{
    try {
        await res.parent.remove()
        res.json('Deleted ')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}) 
async function getParent(req,res,next){
    let parent
    try {
        parent=await Parent.findById(req.params.id)
        if(parent==null){
            return res.status(404).json({message:'Cannot Find Parent'})
        }
    } catch (error) { 
        res.status(500).json({message:error.message})
    }
    res.parent=parent
    next()
}