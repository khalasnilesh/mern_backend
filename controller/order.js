var OrdersModel = require('../model/Order'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

exports.createOrder = function(req, res, next) {
console.log('order insert');        
    var orderdetails = new OrdersModel({
        title: req.body.title ,
        description : req.body.description,
        title: req.body.title,
        productId: req.body.productId,
        clientId: req.body.clientId,
        status : 0,
        userId : req.body.userId,
        _id: mongoose.Types.ObjectId()
          });  
        
        //  UsersModel.create({userdetails } );
        orderdetails.save().then(
            doc =>
            {
              res.status('200').json( {message : "Order created successfuly!!" , data : doc})
            }
          ).catch(
            err=>{ res.json( {message : "Order not created!!" , status: 'fail' , data : err}) }
          );
        
    
  }

exports.orderListing = function(req, res, next) {

  OrdersModel.aggregate([
    {
      $lookup:
        {
          from: "tbl_users",
          localField: "userId",
          foreignField: "_id",
          as: "user_details"
        }
   },
   {$unwind : "$user_details"},
    // Join with user_role table
    {
        $lookup:{
            from: "clients", 
            localField: "clientId", 
            foreignField: "_id",
            as: "client_details"
        }
    },
    {   $unwind:"$client_details" },
    //{ $match : { status : 0 } },
    { 
      $match : {
                status : { $not :{ $eq : 0 }}
                }
    }
    ]).exec( function(err , result ) {
    res.send({ status : 'success', data : result } ); 
 })
  
}
