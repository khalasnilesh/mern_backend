var express = require('express');
const mongoose = require('mongoose');

var path = require('path');
var jwt = require('jsonwebtoken');
var router = express.Router();
var OrdersModel = require('../model/Order'); 

const bcrypt = require('bcrypt');
const multer = require('multer');

const orderController = require("../controller/order");

///////////////////

var router = express.Router();
var bodyParser     =        require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var upload1 =  multer();
////////////////////////////////////
 
var PostsModel = require('../model/Post'); 
var UsersModel = require('../model/User'); 

var UsersModel = require('../model/User'); 

/* GET users listing. */


// Add record
router.post('/createOrder',upload1.none() , orderController.createOrder); 
router.post('/',upload1.none() , orderController.orderListing); 
router.post('/pendingorders',upload1.none() , orderController.pendingorders); 

router.post('/completedorders',upload1.none() , orderController.completedorders); 

  
router.post('/fetchPostbyUserID',upload1.none() , function(req, res, next) {
/*    PostsModel.find({ userId: req.body.userId })
    .populate('userId' , 'username email').exec((err, posts) => {
    res.send({ status : 'success', data : posts } ); 
    })
    */

   PostsModel.aggregate([
    {
      $lookup:
        {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user_details"
        }
   },
   {$unwind : "$user_details"}
 ]).exec( function(err , result ) {
    res.send({ status : 'success', data : result } ); 

 })
}); 


router.post('/fetchuserdetails',upload1.none() , function(req, res, next) {
    /*    PostsModel.find({ userId: req.body.userId })
        .populate('userId' , 'username email').exec((err, posts) => {
        res.send({ status : 'success', data : posts } ); 
        })
        */
    
       UsersModel.aggregate([
        { $lookup:
            {
               from: "posts",
               localField: "_id",
               foreignField: "userId",
               as: "comments"
            }
        }
    ]).exec( function(err , result ) {
        res.send({ status : 'success', data : result } ); 
    
     })
    }); 

    
module.exports = router;
