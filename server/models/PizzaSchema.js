const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    base : {
        type : String,
        
    },
    veggies : {
        type : Array,
        
    },
    toppings : {
        type :Array,
        
    },
    price : {
        type : String,
        required : true,
    },


});

const pizza = mongoose.model("pizza",pizzaSchema);

module.exports = {pizza};