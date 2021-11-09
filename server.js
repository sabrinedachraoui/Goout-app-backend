require('dotenv').config();
const express=  require('express');
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Goout_app');
const db = mongoose.connection;
db.on('error',() => console.error(error));
db.once('open',() => console.log('db is connected'));
app.use(express.json());
const ParentRouter=require('./routes/Parent');
app.use('/Parent',ParentRouter);
const KidRouter=require('./routes/Kid');
app.use('/Kid',KidRouter);
const HeartRouter=require('./routes/Heart');
app.use('/Heart',HeartRouter);
const SleepRouter=require('./routes/Sleep');
app.use('/Sleep',SleepRouter);


app.listen(3000,()=>console.log('server started'));




