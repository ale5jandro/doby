var request = require('request');
var session = require('express-session');
var url = require('url');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');



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

// app.use(parser.json());

app.use(function(req, res, next) {
//loguear todo
  console.log(req.url);
  next();
});

app.use("/ale", function(req, res, next) {
//loguear todo
  // console.log(req);
  res.send("ale");

});

app.use('/', express.static(path.join(__dirname, 'app')));

app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));


var ser = app.listen(config.port);







app.use('/backend', function(req, res, next){ //isAuthenticated(),
  // console.log(req.method);
  if(req.session && req.session.auth){
    var options = {
      url: config.backendProtocol+'://'+config.backendIP+req.url,//https
      // method: req.method,
      headers: {
        'Authorization': 'Basic '+req.session.auth,
        // 'Content-Type': 'application/json'
      }
    };
  }else{
    var options = {
      url: config.backendProtocol+'://'+config.backendIP+req.url,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
  // console.log(options)
  req.pipe(request(options)).pipe(res);
});

app.use('/backendLogout', function(req, res, next){
  req.session.auth = null;
  res.sendStatus(200);
})

app.use(bodyParser.json());

app.use('/backendLogin', function(req, res, next){
  // bodyParser(req, res, function() {
    // console.log(req.body);

    var stringToEncode = req.body.user+':'+req.body.pass;
    var encodedString = new Buffer(stringToEncode).toString('base64')
    req.session.auth = encodedString;

    var options = {
      url: config.backendProtocol+'://'+config.backendIP+'/login',//https
      method: 'GET',
      headers: {
          'Authorization': 'Basic '+encodedString,
          'Content-Type': 'application/json'
        }
    };
    // console.log(options)
    request
    .get(options)
    .on('response', function(response) {
      res.sendStatus(response.statusCode);
    })

    .on('error', function(err){
      console.log(err);
    })
  // });

});



function isAuthenticated(){


  return function(req, res, next) {
// console.log("aunt", req.sesssion.uid);
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