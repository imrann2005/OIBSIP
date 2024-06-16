const mongoose = require('mongoose');
const { UserModel } = require('../models/userSchema');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result){
                const token = jwt.sign(
                    {
                        email : user.email,
                        userId : user._id,
                    },
                    process.env.JWT_KEY || "secret_key",
                    {
                        expiresIn : '1h',
                    }
                );
                return res.status(200).json({msg : "Auth Successfull",token : token});
            }
            return res.status(409).json({ msg: "Incorrect Password" });
        })

    } catch (error) {
        console.log(error);
        res.send(500).json({ msg: "Internal Server Error" });
    }


}

module.exports = { loginController };