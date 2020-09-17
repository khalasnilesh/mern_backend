var express = require('express');
const mongoose = require('mongoose');

var path = require('path');
var jwt = require('jsonwebtoken');
var router = express.Router();
var ClientsModel = require('../model/Client'); 

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
const clientsController = require("../controller/client");
////////////////
var checkAuth = require("../middleware/auth");
//////////////////
var router = express.Router();
var bodyParser     =        require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
////////////////////////////////////
 
//var UsersModel = require('../model/User'); 
/* GET users listing. */


// user register
router.post('/addclient' ,   upload.none(), clientsController.addclient);
// session store
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
} 

// fetch client details
router.post('/fetchClientDetails' ,   upload.none(), clientsController.fetchClientDetails);
// user login
router.post('/login' ,  upload.none() , clientsController.login ); 


// update client

router.post('/updateclient' ,   upload.none(), clientsController.updateclient);

// user logout
router.post('/logout' , function(req, res, next) {
  localStorage.removeItem('secret');
  res.send({ 'status' : 'success' , 'message' : 'logout success!'} );      
}); 

// update profile
router.post('/updateprofile',upload.single('userphoto') ,checkAuth, clientsController.updateprofile ); 

// client listing
router.post('/', upload.none() , function(req, res, next) {
  console.log('Test ');

  ClientsModel.find( {} , function(err, data) 
{
    if(data.length)
    {
        res.send({ status : 'success', data  : data, message : 'CLient data listing successfully!!'});
    }
    else
    {
        res.send({ status : 'success', data  : data , message : 'No data found!!'});

    }
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
