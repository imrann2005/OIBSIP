const mongoose = require('mongoose');


const userSchema =  mongoose.Schema(
 {   email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,

    },
    fullName : {
        type : String,
        required : true,

    },
    loginNumber : {
        type : String,
        required : true,
    },
   
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderModel"
    }],
}

)

const UserModel = mongoose.model("UserModel",userSchema);

module.exports = {UserModel};
