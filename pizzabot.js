module.exports = function (req, res, next) {
	var apiai = require('apiai');
	var accessToken = "<need key>";
	var baseUrl = "https://api.api.ai/v1/";
	var app = apiai(accessToken);
	var question = req.body.text;
	
	question = question.toLowerCase().replace("pizzabot", "").trim();
	
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
