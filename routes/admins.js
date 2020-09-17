
var express = require('express');
const mongoose = require('mongoose');

var path = require('path');
var jwt = require('jsonwebtoken');
var router = express.Router();
var ClientsModel = require('../model/Admin'); 

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

///////////////////////////   
   


///////////////////
const clientsController = require("../controller/admin");
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


router.post('/logincheck', function(req, res, next) {
    
        if(req.body.email == 'admin@gmail.com' && req.body.password == '123456')
        {
        var token1 = jwt.sign({ username: req.body.email , password : req.body.password }, 'secret');
        // localStorage.setItem('usertoken', token1);
        res.send( { message: "correct details!!" ,  token : token1});
        }
        else
        {
            res.send( { message: "Incorrect details!!" , data : ''});
        }
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
