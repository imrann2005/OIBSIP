const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    pizza : {
        type : mongoose.Types.ObjectId,
        ref : 'pizza',
        required : true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'UserModel',
        required : true,
    },
    totalPrice : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const OrderModel = mongoose.model('OrderModel',orderSchema);

module.exports = OrderModel;