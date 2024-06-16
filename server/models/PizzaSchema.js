const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
    },
    base : {
        type : String,
        
    },
    veggies : {
        type : Array,
        
    },
    sauce : {
        type :Array,
        
    },
    cheese : {
        type :Array,
        
    },
    meat : Number,
    qty : {
        type : Number,
        default : 0,
    },
    price : {
        type : String,
        required : true,
    },


});

const Pizza = mongoose.model("pizza",pizzaSchema);

module.exports = {Pizza};