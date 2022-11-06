const express = require('express');
const mongoose = require('mongoose');

const app= express()



require('dotenv').config()
// Middlewares

const bodyParser = require('body-parser')
app.use(bodyParser.json());

//Routes
const postRoute= require('./routes/post') ;

app.use('/posts',postRoute);

app.get('/',(req,res)=>{
    res.send("We are on home")
})

app.post('/',(req,res)=>{
    res.send("We are on home")
})

app.put('/',(req,res)=>{
    res.send("We are on home")
})

//connect to db
mongoose.connect(process.env['MONGO_URI'],{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("connected to db")
})


// how do we start listening on the server.
app.listen('3000')