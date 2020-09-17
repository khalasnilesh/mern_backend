var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //var token = req.body.token;
    var headerToken = req.headers.authorization;

    
    
    // console.log(token);
    try{
       var decode = jwt.verify(headerToken, 'secret');
       req.usertoken11 = decode;
       next();

    }
    catch(error) 
    {
        //console.error("error" + error);
        res.status(200).json({ 'status' : 'Fail'  , 'message' : 'In Valid Token!'} );      
    }
}
