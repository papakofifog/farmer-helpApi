
const express= require('express')

const statementRouter = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../JWT");
const cropRevenue= require('../modules/crop')
const statementDecodeJwt= require('jwt-decode');


// code to get all incomeStatements

statementRouter.get('/viewStatements', async(req,res)=>{
    try{
        let all_statements= await cropRevenue.find();
        res.json(all_statements)
    }catch(err){
        res.json({"message":err})
    }
})




// code to create the income statement data.
statementRouter.post('/calculation', validateToken, async(req, res)=>{
    
    //const { period, crops ,total_revenue,cost_goods,expenses, } = req.body;
    let newResult= req.headers.cookie.slice(6,)
    let userDetails=statementDecodeJwt(newResult);
    let userId= userDetails.id;

    //console.log(userId)
    let farmerID=userId;
    let period= req.body.period;
    let crops= req.body.cropName;
    let total_revenue= req.body.totalRevenue;
    let cost_goods= req.body.costGoods;
    let total_expenses= req.body.expenses;

    let totalRevenue=total_revenue-cost_goods;

    NetIncome=totalRevenue-total_expenses;
    //console.log(total_expenses)
    const newcropData= new cropRevenue ({
        farmerId:farmerID,
        crops:crops,
        totalRevenue:totalRevenue,
        totalExpenses:total_expenses,
        NetIncome: NetIncome,
        Period: period
    });
    
    //res.json(newcropData)


    try{
        const saveRevenue= await newcropData.save();
        res.json(saveRevenue)
    }catch(err){
        res.json({'error_message': err})
    }

})

module.exports= statementRouter;