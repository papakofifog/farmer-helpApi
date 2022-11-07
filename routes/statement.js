const express = require('express')

const router = express.Router();
// import the farmer module
let farmerData= require('../modules/farmer');



const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../JWT");


router.post('/statement',validateToken, (req, res)=>{
    // get user farmerid from the token
    let userId= req.cookies['access-token'].id;
    const user = farmerData.findById({_id:userId});
    if (!user) res.json({"error-message":"User not found"})



})