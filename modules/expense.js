const mongoose = require('mongoose');
const expenses= mongoose.Schema({
    farmerId:{
        type:"String",
        required:"true"
    },
    totalExpense:{
        type:"String",
        required:"true"
    },
    
})


module.exports = mongoose.model('expense',expenses)