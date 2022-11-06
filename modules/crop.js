const mongoose = require('mongoose');

const cropRevenue= mongoose.Schema({
    farmerId:{
        type:"String",
        required:"true"
    },
    CrepName:{
        type:"String",
        required:"true"
    },
    revenueGenerated: {
        type:"String",
        required:"true"
    },
    farming_period:{
        type:"String",
        required:"true"
    }
    
})

module.exports = mongoose.model('crop',cropRevenue)