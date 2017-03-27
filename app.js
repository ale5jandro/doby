var request = require('request');
var session = require('express-session');
var url = require('url');
var express = require('express');
var path = require('path');


var app = express();



var config = require(process.env.CONF||'/etc/nodejs-config/doby.json').frontend;

var logMiddleware = function() {
  return function(req, res, next) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(ip);
    req.log = function () {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);

        function formatConsoleDate (date) {
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var milliseconds = date.getMilliseconds();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            return ip+' [' +
                day+
                '/'+
                month+
                '/'+
                year+
                ' '+
                   ((hour < 10) ? '0' + hour: hour) +
                   ':' +
                   ((minutes < 10) ? '0' + minutes: minutes) +
                   ':' +
                   ((seconds < 10) ? '0' + seconds: seconds) +
                   //'.' +
                   //('00' + milliseconds).slice(-3) +
                   '] ';
        }

        console.log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
    };

    next();
  }
}


var sessionMiddleware = session({
  secret: 'dobysecreto',
  resave: true,
  saveUninitialized: true
});


app.use(sessionMiddleware);
app.use(logMiddleware());


app.use(function(req, res, next) {
//loguear todo
  console.log(req.url);
  next();
});

app.use("/ale", function(req, res, next) {
//loguear todo
  res.send("ale");
});

app.use('/', express.static(path.join(__dirname, 'app')));

app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));


var ser = app.listen(config.port);



function isAuthenticated(){


  return function(req, res, next) {
console.log("aunt", req.session.uid);
    if (req.session.uid){
         //puede pasar
      next();
    }
    else{
         //no puede pasar
           //next();
    }
  }

}

process.on('uncaughtException', function (exception) {
  // handle or ignore error
  console.log("error")
  console.log(exception);
});