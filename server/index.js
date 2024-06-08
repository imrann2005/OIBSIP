const express = require('express');
const {router} = require('./routes');
require('dotenv').config();

const connect = require('./DB/connection.js');


const app = express();
const port = process.env.PORT;

//Middleware
app.use(express.json());
app.use("/",router);

//Database Connection
connect();

//set up server
app.listen(port,(req,res)=>{
    console.log(`Server started on port ${port}`);
})