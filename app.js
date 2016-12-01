var express = require('express');
var bodyParser = require('body-parser');
var hellobot = require('./pizzabot');
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/test', function (req, res) { res.status(200).send('Hello world!') });

// main routes
app.get('/',function(req,res){       
	//__dirname : It will resolve to your project folder.
	res.sendFile(path.join(__dirname+'/chattypizza.html'));
});

app.post('/hello', hellobot);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});