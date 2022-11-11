const { response, application } = require('express');
const express = require('express')
const decodeJwt= require('jwt-decode');

const router = express.Router();
// import the farmer module
let farmerData= require('../modules/farmer');


const bcrypt = require("bcrypt");
//const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../JWT");
//const farmerData = require('../modules/farmer');


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
    
    const body= req.body;
    
    console.log(body.name)

    if (!body.username && body.password){
        return res.status(400).send({error:"Data not formatted properly"})
    }
    // creating a new mongoose doc from user data
    let newfarmer= new  farmerData(body);
    let salt= await bcrypt.genSalt(10);

    newfarmer.password= await bcrypt.hash(newfarmer.password,salt);

    //res.json(newfarmer)
    try{
        newfarmer.save().then((doc)=> res.status(201).json({"message":"User registered"}));
    }catch(err){
        res.json({'error_message': err})
    }

})


router.post('/login',async (req,res)=>{
    const { username , password } = req.body;

    const user= await farmerData.findOne({ username: username});

    if(!user) res.status(400).json({"error":"User does not Exists"});

    const Isverified= await bcrypt.compare(password,user.password);

    

    if( Isverified){
        const accessToken = createTokens(user);
        res.clearCookie('token');
        res.cookie('token',accessToken, {
            maxAge: 60*60*24*30*1000,
            httpOnly: false
        })
        res.json("Logged In")
    }else{
        res.status(400).json({error:"Invalid username or password."})      
    }

})

    

router.get("/profile", validateToken, async (req, res) => {
    let newResult= req.headers.cookie.slice(6,)
    let userDetails=decodeJwt(newResult);
    let userId= userDetails.id;
    //console.log(userId)
    // get user details
    try{
        const farmerDetails= await farmerData.findById(userId);
    res.json({
        "name": farmerDetails.name,
        //"BuisnessName":farmerDetails.BuisnessName,
        "farmLocation": farmerDetails.farmLocation
    })
    //res.json(farmerDetails)
    }catch(err){
        res.json(err)
    }
    
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

