"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var pb = require('./pizzabot');
var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/test', function (req, res) { res.status(200).send('Hello world!') });

app.use(express.static('public'))

// main routes
app.get('/',function(req,res){       
	//__dirname : It will resolve to your project folder.
	res.sendFile(path.join(__dirname+'/chattypizza.html'));
});

app.post('/hello', function(req, res, next){
	pb.PizzaBotChat(req, res, next);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

var server = app.listen(port, function () {
  //console.log('Slack bot listening on port ' + port);
});

module.exports = server;