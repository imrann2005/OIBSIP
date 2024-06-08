const { mongoose } = require('mongoose');
const { users } = require('../models/userSchema.js');
const { pizza } = require('../models/PizzaSchema.js');

const getAllUsers = async (req, res) => {

    try {
        const allUsers = await users.findOne({});
        res.status(200).json({ msg: "All users fetched succesfully" });
    } catch (error) {
        res.status(500).json({msg : "Internal Server Error"});
    }
}

module.exports = {getAllUsers};