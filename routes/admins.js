
var express = require('express');
const mongoose = require('mongoose');

var path = require('path');
var jwt = require('jsonwebtoken');
var router = express.Router();
var adminModel = require('../model/Admin'); 
const adminController = require("../controller/admin");
var checkAuth = require("../middleware/auth");


const bcrypt = require('bcrypt');


///// image upload
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/userprofile/')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '-' + file.originalname )
  }
})
const upload = multer({storage:  storage});

var checkAuth = require("../middleware/auth");
//////////////////
var router = express.Router();
var bodyParser     =        require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
////////////////////////////////////
 
//var UsersModel = require('../model/User'); 
/* GET users listing. */

router.post('/register' ,   upload.none(), adminController.register);
router.post('/login' ,   upload.none(), adminController.login);

//router.post('/logincheck', function(req, res, next) {


router.post('/logout', function(req, res, next) {
     localStorage.removeItem('AdminSecret');
     res.send( { message: "Log Out Successfully" , status : 'success'});
    });

function checklogin(req, res, next)
{

    var usertoken = localStorage.getItem('usertoken');
    try
    {

        jwt.verify(usertoken , 'logintokenalgo');
    }
    catch(err) 
    {
        res.send({ 'status' : 'fail' , 'message' : 'You need to login!!' , 'token' : localStorage.getItem('usertoken')} );      

    }
    next();
}
module.exports = router;
