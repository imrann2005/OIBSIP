const mongoose = require('mongoose');
const { users } = require('../models/userSchema');

const loginController = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await users.findOne({ email: email });
        if(!user){
            res.status(404).json({msg : "User Not Found"});
        }
        else{
            if(user.password == password){
                res.status(200).json({msg : "Login Successful"});
            }
            else{
                res.status(203).json({msg : "Incorrect Password!"});
            }
        }
    } catch (error) {
        console.log(error);
        res.send(500).json({msg : "Internal Server Error"});
    }


}

module.exports = {loginController};