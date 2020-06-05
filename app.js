const fetch = require('node-fetch');

var fs = require('fs');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

//coding for the pokemon api
let input = 'input.txt';

var data = fs.readFileSync(input);

console.log(data);
var typesObj = {};

var namelines = data.toString().split('\n');
console.log(namelines)
//iterate over the pokemon and fetch the appropriate data (their types (can be more than 1))
for (var i = 0; i < namelines.length; i++) {
  //log their types on an array
  typesObj[namelines[i]] = []
  fetch('https://pokeapi.co/api/v2/pokemon/' + namelines[i])
    .then(response => response.json()) // turn the response into json
    .then(json => { 
      //console.log('NAME: ',json.name);
      //console.log('namelines: ', namelines[i])
      let pokeType = json.types;
      pokeType.forEach(typeItem => {
        console.log(typeItem.type.name)
        typesObj[json.name].push(typeItem.type.name)
        console.log(typesObj)
      });
      
    })
  //console output the information in this format:
  /*
  Charizard: flying, fire
  Pikachu: electric 
  */
 console.log(typesObj);

}

for (var key in typesObj) {
  console.log('key', key, typesObj[key]);
}