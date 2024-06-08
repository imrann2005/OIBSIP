const {users} = require('../models/userSchema');
const mongoose = require('mongoose');
const signUpController = async(req,res) => { 
    
   //console.log(req.body);
   const {email,password,fullname,loginNumber}  = req.body;
   try {
    const user = await users.findOne({email : email});
    console.log(user);
    //if(!user) res.status(200).json({msg : "GO Ahead!"});
     if(user) res.status(403).json({msg : "User already exists !"});
      else {
        const newUser = await new users(req.body);
        await newUser.save();
        //console.log(`Saved Users`);
        //console.log(savedUser);
        res.status(200).json({msg : "Successfully Saved",savedUser : newUser});
      }
   } catch (error) {
    console.log(error);
    res.status(500).json({msg : "Internal Server Error"});
   }
 }

 module.exports = {signUpController};