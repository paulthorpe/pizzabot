"use strict";
var Probe = require('pmx').probe();
var apiai = require('apiai');

var counterSuccessfulOrders = 0;
var metric = Probe.metric({
	name    : 'Counter',
	value   : function() {
		return counterSuccessfulOrders;
	}
});

var meter = Probe.meter({
  name      : 'req/min',
  samples   : 1,
  timeframe : 60
});

var PizzaBot = {
	init: function(){
		this.accessToken = "6a0a368df7ee4efa8ffa48a8d73c64bb";
		this.baseUrl = "https://api.api.ai/v1/";
	},
	PizzaBotChat: function(req, res, next){
		//console.log(req);
		if(req.body.text != undefined){
			var app = apiai(this.accessToken);
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
				
				meter.mark();
				counterSuccessfulOrders++;
				
				return res.status(200).json(result);
			});
		 
			request.on('error', function(error) {
				console.log(error);
				return res.status(500).end();
			});
		 
			request.end();
		} else {
			return res.status(204).end();
		}
	}
}

var pb = Object.create(PizzaBot);
pb.init();

module.exports = pb;
