const { response, application } = require('express');
const express = require('express')

const router = express.Router();
// import the farmer module
let farmerData= require('../modules/farmer');


const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../JWT");


// code to get all farmers
router.get('/', async(req,res)=>{
    try{
        let allFarmers = await farmerData.find();
        res.json(allFarmers);
    }catch(err){
        res.json({message:err})
    }
})


// code to register a farmer
router.post('/register', async (req,res)=>{
    
    let newfarmer= new  farmerData({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        farmLocation:req.body.farmLocation
    })

    try{
        const savedFarmer= await newfarmer.save();
        res.json("User Registered")
    }catch(err){
        res.json({'error_message': 'err'})
    }
    
})


router.post('/login',async (req,res)=>{
    const { username , password } = req.body;

    const user= await farmerData.findOne({ username: username});

    if(!user) res.status(400).json({"error":"User does not Exists"});

    const userPassword= user.password;

    if( password != userPassword){
        res.status(400).json({error:"Wrong user name and password"})
    }else{
        const accessToken = createTokens(user);
        res.cookie('access-token', accessToken, {
            maxAge: 60*60*24*30*1000,
            httpOnly: true
        });

        res.json("Logged In")
    }

})


router.get("/profile", validateToken, (req, res) => {
    res.json("profile");
  });


// CODE TO GET A SPECIFIC FARMER

router.get('/:farmerId', async (req,res)=>{
    try{
        let specificfarmer= await farmerData.findById(req.params.farmerId);
        res.json(specificfarmer)
    }catch(err){
        res.json(err)
    }
    
})


// CODE DELETE A FARMER

router.delete('/:farmerId',async (req,res)=>{
    try{
      let removedFarmer= await farmerData.remove({_id: req.params.farmerId}) 
      res.json(removedFarmer);
    }catch(err){
        res.json(err)
    }
})


//Code update a famer data

router.patch('/:farmerId',async (req,res)=>{
    try{
        let updatedFarmer= await farmerData.updateOne({_id:req.params.farmerId},
            { $set: {
                farmLocation:"Kumasi"
            }})
        res.json(updatedFarmer)
    }catch(err){
        res.json(err)
    }
})

module.exports = router;