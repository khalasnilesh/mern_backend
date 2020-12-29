var OrdersModel = require('../model/Order'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

exports.sendEmail = function(req, res, next) {
    //res.status('200').json( { status : 'success' , message : "Order created successfuly!!" })
                "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
      tls: {
          rejectUnauthorized: false
      }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo" <nilesh@iniquesolutions.com>', // sender address
    to: "nileshkhalas@gmail.com", // list of receivers
    subject: "Hello", // Subject line
  //  text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  if(info.messageId)
  {
    res.status('200').json( { status : 'success' , message : "Order created successfuly!!" , ID : info.messageId})
  }
  else
  {
    res.status('200').json( { status : 'fail' , message : "email not snt" })
  }
 // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
}
