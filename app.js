var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var clinicsRouter = require('./routes/clinics');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var clientsRouter = require('./routes/clients');
var AdminsRouter = require('./routes/admins');
var OrdersRouter = require('./routes/orders');
var EmailsRouter = require('./routes/emails');

require ('./connection'); 
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hey, My First Doctor App in Node JS')
})

app.use('/', indexRouter);
app.use('/clinics', clinicsRouter); 
app.use('/users', usersRouter); 
app.use('/posts', postsRouter); 
app.use('/clients', clientsRouter); 
app.use('/admins', AdminsRouter); 
app.use('/orders' , OrdersRouter);
app.use('/emails' , EmailsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next(createError(404));
});  


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));


//app.disable('etag');

