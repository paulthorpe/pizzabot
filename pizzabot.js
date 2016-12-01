var apiai = require('apiai');

var accessToken = "6a0a368df7ee4efa8ffa48a8d73c64bb";
var baseUrl = "https://api.api.ai/v1/";

module.exports = function (req, res, next) {
	var app = apiai(accessToken);
	var question = req.body.text;
	
	console.log(req.body.token);
	
	if(req.body.token != undefined){
		var slackUserToken = req.body.token
		var request = app.textRequest(question, {
			sessionId: slackUserToken
		});
	}else{
		var request = app.textRequest(question, {
			sessionId: 'somerandomthing'
		});
	}
	
	request.on('response', function(response) {
		var result = {
			text : response.result.fulfillment.speech
		}
		
		return res.status(200).json(result);
	});
 
	request.on('error', function(error) {
		console.log(error);
		return res.status(200).end();
	});
 
	request.end();
}
