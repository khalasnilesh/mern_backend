var UsersModel = require('../model/User'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// const multer = require('multer');
// const upload = multer({dest:  + '../public/images/userprofile'});



/// image upload
  /////////////
  // const multer = require('multer');
  // var storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, './public/images/userprofile/')
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null,  Date.now() + '322222222-1111111' + file.originalname )
  //   }
  // })
  // const upload = multer({storage:  storage}); 
  //////////////////

/////////////////////////////

exports.register = function(req, res, next) {

    bcrypt.hash(req.body.password, 10, function(err, hash) {
     // Store hash in your password DB.
        if(err) {
          return res.json({ "message" : "password issue"});
        }
        else{
          var userdetails = new UsersModel({
           _id : mongoose.Types.ObjectId(),
            username :  req.body.username ,
            password: hash,
            email :  req.body.email,
            role : '3',
            status : req.body.status
          });  
        
        //  UsersModel.create({userdetails } );
          userdetails.save().then(
            doc =>
            {
              res.status('200').json( {message : "user created successfuly!!" , data : doc})
            }
          ).catch(
            err=>{ res.json( {message : "User not created!!" , status: 'fail' , data : err}) }
          );
  
        }
      
  
    });
    
   
  }

  ////////////// login

  exports.login = function(req, res, next) {

    // var token1 = jwt.sign({ username: req.body.username , password : req.body.password }, 'logintokenalgo');
  
    // localStorage.setItem('tokenvar', token1);
    
    
    UsersModel.findOne({ email: req.body.email }, function(err, result) {
      if (!result) {
        res.send({ message: "The email and password combination is not correct!" });
      }
      else{

            if(!bcrypt.compareSync(req.body.password, result.password)) {
              res.send( { message: "The password is invalid" });
            }
            else
            {
              var token1 = jwt.sign({ username: req.body.username , password : req.body.password }, 'secret');
             // localStorage.setItem('usertoken', token1);
              result['token'] = token1;
              res.send( { message: "correct details!!" , data : result , token : token1});

            }
      } 
  
    });   
   
  }

  exports.updateprofile = function(req, res, next) {

    //  console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnn');
    //  console.log(req.body.userId);
    //  console.log('pppppppppppppppppppppppppppppp');
   
    bcrypt.hash(req.body.password, 10, function( err, hash) {


      
        if(!err) {
         // Passwords match
        var userphoto = req.file.filename;
        var password = hash;

        //var myquery = { _id: req.body.userId };

        var newvalues = { $set: { password: hash , userphoto : userphoto} };
        var filepath = req.file.filename;
        UsersModel.findByIdAndUpdate(        req.body.userId
            , newvalues,  function(err, obj) {
            if (err)
            {
                res.send({status : 'Update fail' , message : err});
        
            };
           res.send({status : 'Success' , message : '11Profile updated successfully!' , data : obj});
            //db.close();  
            }
            
            );

        } else {
         // Passwords don't match
         res.send({status : 'Fail' , message : 'Password is not proper'});
        } 
      });
      
   
  }     
  

 
  