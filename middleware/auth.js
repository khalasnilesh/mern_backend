var jwt = require('jsonwebtoken');

    module.exports = (req, res, next) => {
    //var token = req.body.token;
    var headerToken = req.headers.authorization;
    var headerToken = req.headers.authorization.split(" ")[1];
    console.log(headerToken);
    try{
       var decode = jwt.verify(headerToken, 'AdminSecret');
       req.usertoken11 = decode;
       console.log(decode);
       next();
    }
    catch(error) 
    {
        //console.error("error" + error);
       // res.status(200).json({ 'status' : 'Fail'  , 'message' : 'In Valid Token!'} );      
       res.status(401).json({
            error:"Invalid Token"
        });
    }
}
