var express = require('express');
var multer = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');
var upload1 =  multer();
var checkAuth = require("../middleware/auth");

var router = express.Router();
var bodyParser     =        require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.use(express.static(__dirname + "./upload/profilepicture/"));


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  } 


var Storage = multer.diskStorage(
    {
        destination: "./upload/profilepicture/",
        filename:(req, file, cb)=>
        {
           cb(null,file.fieldname+"_"+Date.now() + path.extname (file.originalname) );
        }
    }
); 
var upload = multer(
    {
        storage : Storage
    }
).single('profile_imge');


var Clinics = require('../model/Clinic'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
    Clinics.find( {} , function(err, data) 
  {
    res.status('200').json({ status : 'success', 'result' : data  , 'token': localStorage.getItem('tokendoctor')});
  })

    
});
// Add record  
router.post('/add',upload1.none(), function(req, res, next) {
    Clinics.create({ name: req.body.name , address : req.body.address , area : req.body.area } );
    res.send({ status : 'success', data : {name : req.body.name} } ); 
}); 
// Edit Record
router.post('/delete', function(req, res, next) {
    var myquery = { _id: req.body.id };

    Clinics.deleteOne(myquery , function(err, obj) {
        if (err) throw err;
        res.send({ status : 'success', message : 'record deleted'} );      
        //db.close();
      });
   
}); 
router.post('/update',upload , function(req, res, next) {
    var myquery = { _id: req.body.id };

    var newvalues = { $set: { address: "Canyon 123  111" } };
    var filepath = req.file.filename;
    Clinics.updateOne(myquery ,newvalues, function(err, obj) {
        if (err) throw err;
        res.send({ status :  req.body.id,'filepath' : filepath , 'message' : 'record updated successfully!'} );      
        //db.close();
      });
   
}); 

router.post('/login' , function(req, res, next) {

    var token1 = jwt.sign({ username: req.body.username , password : req.body.password }, 'logintokenalgo');

    localStorage.setItem('tokenvar', token1);
    console.log(localStorage.getItem('tokenvar'));

        res.send({ status : 'success' , message : 'login in success!'} );      
     
   
}); 

router.post('/logout' , function(req, res, next) {
    
    localStorage.removeItem('tokenvar');
    res.send({ 'status' : 'success' , 'message' : 'logout success!'} );      
 

}); 


function checklogin(req, res, next)
{
    var tokenvar = localStorage.getItem('tokenvar');
    try
    {

        jwt.verify(tokenvar , 'logintokenalgo');
    }
    catch(err) 
    {
        res.send({ 'status' : 'fail' , 'message' : 'You need to login!!' , 'token' : localStorage.getItem('tokenvar')} );      

    }
    next();
}
module.exports = router;


