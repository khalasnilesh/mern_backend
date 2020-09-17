var express = require('express');
const mongoose = require('mongoose');

var path = require('path');
var jwt = require('jsonwebtoken');
var router = express.Router();
var UsersModel = require('../model/User'); 

const bcrypt = require('bcrypt');
//const multer = require('multer');
//const upload = multer({});

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

///////////////////////////  
   


///////////////////
const userController = require("../controller/user");
////////////////
var checkAuth = require("../middleware/auth");
//////////////////
var router = express.Router();
var bodyParser     =        require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
////////////////////////////////////
 
var UsersModel = require('../model/User'); 
/* GET users listing. */




// user register
router.post('/register' ,   upload.none(), userController.register);
// session store
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
} 

// user login
router.post('/login' ,  upload.none() , userController.login ); 

// user logout
router.post('/logout' , function(req, res, next) {
  localStorage.removeItem('secret');
  res.send({ 'status' : 'success' , 'message' : 'logout success!'} );      
}); 

// update profile
router.post('/updateprofile',upload.single('userphoto') ,checkAuth, userController.updateprofile ); 

// user listing
router.post('/', upload.none() ,checkAuth, function(req, res, next) {
  UsersModel.find( {} , function(err, data) 
{
     res.send({ status : 'success', data  : data});
})
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
