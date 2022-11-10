const mongoose = require('mongoose');

const cropRevenue= mongoose.Schema({
    farmerId:{
        type: "String",
        required: true
    },
    crops:{
        type:"String",
        required:true
    },
    totalRevenue:{
        type:"number",
        required:"true"
    },
    totalExpenses: {
        type:"number",
        required:"true"
    },
    NetIncome:{
        type:"number",
        required:"true"
    },
    Period: {
        type: "String",
        required: true
    }
    
});


module.exports = mongoose.model('crop',cropRevenue)


