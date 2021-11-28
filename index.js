require('dotenv').config()
const express = require ('express' )
const app = express()
const mongoose = require ("mongoose")
const path = require('path')
const unless = require('express-unless')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const auth = require('./Middleware/auth')
const db = mongoose.connection

db.on ("error", (error) => console.error(error))
db.once('open',() => console.log("Connected to DB"))
/*auth.authenticateToken.unless = unless
app.use(
    auth.authenticateToken.unless({
        path: [
            {url:  "/Parent.router/login", methods:["POST"]},
            {url:  "/Parent.router/register", methods:["POST"]},
        ],
    })
);*/
app.use(express.json())
app.use('/upload',express.static(path.join(__dirname,'Uploads')))

const ParentRoute = require('./Routes/Parent.router')
app.use('/parent',ParentRoute)

