require('dotenv').config()
const express = require ('express' )
const app = express()
const mongoose = require ("mongoose")
const path = require('path')
const unless = require('express-unless')
mongoose.connect(process.env.DATABASE_URL)
const auth = require('./Middleware/auth')
const db = mongoose.connection

db.on ("error", (error) => console.error(error))
db.once('open',() => console.log("Connected to DB"))

app.use(express.json())
app.use('/Uploads',express.static(path.join(__dirname,'Uploads')))

const ParentRoute = require('./Routes/Parent.router')
app.use('/Parent',ParentRoute)
app.listen(3000, () => console.log("Server Started"))

