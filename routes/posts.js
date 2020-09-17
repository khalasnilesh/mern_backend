var express = require('express');
const mongoose = require('mongoose');

var path = require('path');
var jwt = require('jsonwebtoken');
var router = express.Router();
var UsersModel = require('../model/User'); 

const bcrypt = require('bcrypt');
const multer = require('multer');


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




// router.post('/register' ,   upload.none(), function(req, res, next) {

//   bcrypt.hash(req.body.password, 10, function(err, hash) {
//    // Store hash in your password DB.
//       if(err) {
//         return res.json({ "message" : "password issue"});
//       }
//       else{
//         var userdetails = new UsersModel({
//          _id : mongoose.Types.ObjectId(),
//           username :  req.body.username ,
//           password: hash,
//           email :  req.body.email
//         });  
      
//       //  UsersModel.create({userdetails } );
//         userdetails.save().then(
//           doc =>
//           {
//             res.status('200').json( {message : "user created successfuly!!" , data : doc})
//           }
//         ).catch(
//           err=>{ res.json( {message : "user created successfuly!!" , data : err}) }
//         );

//       }
    

//   });
  
 
// });
// // session store
// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// } 

// router.post('/login' ,  upload.none() , function(req, res, next) {

//   // var token1 = jwt.sign({ username: req.body.username , password : req.body.password }, 'logintokenalgo');

//   // localStorage.setItem('tokenvar', token1);
//   // console.log(localStorage.getItem('tokenvar'));
//   UsersModel.findOne({ username: req.body.username }, function(err, result) {
//     if (!result) {
//       res.send({ message: "The username and password combination is not correct!" });
//     }
//     else{
//           if(!bcrypt.compareSync(req.body.password, result.password)) {
//             res.send( { message: "The password is invalid" });
//           }
//           else
//           {
//             var token1 = jwt.sign({ username: req.body.username , password : req.body.password }, 'logintokenalgo');
//             localStorage.setItem('usertoken', token1);
//             res.send( { message: "correct details!!" , data : result});
//           }
//     } 

//   });   
 
// }); 

// router.post('/logout' , function(req, res, next) {
    
//   localStorage.removeItem('usertoken');
//   res.send({ 'status' : 'success' , 'message' : 'logout success!'} );      


// }); 

// router.post('/', checklogin, function(req, res, next) {
//   UsersModel.find( {} , function(err, data) 
// {
//      res.send({ status : 'success', data  : data, 'token': localStorage.getItem('tokendoctor')});
// })
// });


// function checklogin(req, res, next)
// {
//     var usertoken = localStorage.getItem('usertoken');
//     try
//     {

//         jwt.verify(usertoken , 'logintokenalgo');
//     }
//     catch(err) 
//     {
//         res.send({ 'status' : 'fail' , 'message' : 'You need to login!!' , 'token' : localStorage.getItem('usertoken')} );      

//     }
//     next();
// }

// Add record
router.post('/createPosts',upload1.none() , function(req, res, next) {
    PostsModel.create({ title: req.body.title , description : req.body.description , userId : req.body.userId , _id: mongoose.Types.ObjectId() } );

    res.send({ status : 'success', data : req.body } ); 
}); 
router.post('/',upload1.none() , function(req, res, next) {
    /*PostsModel.create({ title: req.body.title , description : req.body.description , userId : req.body.userId , _id: mongoose.Types.ObjectId() } );

    res.send({ status : 'success', data : req.body } ); */
     PostsModel.find( {} , function(err, data) 
  {
    res.status('200').json({ status : 'success', 'result' : data  , 'token': localStorage.getItem('tokendoctor')});
  })
}); 


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
