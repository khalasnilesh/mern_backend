var express = require('express');
const mongoose = require('mongoose');

var path = require('path');
var jwt = require('jsonwebtoken');
var router = express.Router();
var OrdersModel = require('../model/Order'); 

const bcrypt = require('bcrypt');
const multer = require('multer');

const emailController = require("../controller/email");

///////////////////

var router = express.Router();
var bodyParser     =        require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var upload1 =  multer();
////////////////////////////////////
 

/* GET users listing. */


// Add record
router.post('/sendEmail',upload1.none() , emailController.sendEmail); 

    
module.exports = router;
