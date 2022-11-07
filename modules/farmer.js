const mongoose = require('mongoose');

const farmers= mongoose.Schema({
    
    name:{
        type:"String",
        required:"true",
        unique: true
    },
    username: {
        type:"String",
        required:"true",
        unique: true
    },
    password:{
        type:"String",
        required:"true"
    },
    farmLocation : {
        type:"String",
        required:"true"
    }
})

module.exports = mongoose.model('farmer',farmers)



