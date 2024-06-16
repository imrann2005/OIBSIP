const { users } = require('../models/userSchema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const signUpController = async (req, res) => {

  //console.log(req.body);
  const { email, password, fullName, loginNumber } = req.body;
  try {
    const user = await users.findOne({ email: email });
    let newPass;
    console.log(user);
    //if(!user) res.status(200).json({msg : "GO Ahead!"});
    if (user) return res.status(403).json({ msg: "User already exists !" });
    else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) return res.status(404).json({ msg: "Error in saving password" });
        newPass = hash;

        const newUser = await new users({ email, password: newPass, fullName, loginNumber });
        await newUser.save();
        //console.log(`Saved Users`);
        //console.log(savedUser);
        res.status(201).json({ msg: "Successfully Saved", savedUser: newUser });
      })

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = { signUpController };