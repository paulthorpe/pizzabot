"use strict";
var supertest = require("supertest");
var expect = require('chai').expect;

describe('pizzabot Express Server routes',function(){
	var server
	beforeEach(function () {
		server = require('../app');
	});
		
	afterEach(function () {
		server.close();
	});
	
	it('PizzaBot Server responding to /',function(done){
		supertest(server).get('/').expect(200, done);
	});
	
	it('PizzaBot Server responding to /hello',function(done){
		supertest(server)
		.post('/hello')
		.send("text=test&token=5")
		.expect(200,done);
	});
	
	it('PizzaBot Server Missing text content but does not crash',function(done){
		supertest(server)
		.post('/hello')
		.send("token=5")
		.expect(204,done);
	});
	
	it('404 random paths', function testPath(done) {
		supertest(server)
		.get('/foo/bar')
		.expect(404, done);
	});
	
	it('PizzaBot Server return IS JSON',function(done){
		supertest(server)
		.post('/hello')
		.send("text=bob&token=5")
		.expect('Content-Type', 'application/json; charset=utf-8',done);
	});
	
	it('PizzaBot Server JSON contains text key',function(done){
		supertest(server)
		.post('/hello')
		.send("text=bob&token=5")
		.end(function(err, result) {
			expect(result.body.hasOwnProperty('text')).to.be.true;
			done();
		});
	});
});

describe('pizzabot class methods',function(){
	var pizzaBot;
	beforeEach(function () {
		pizzaBot = require('../pizzabot');
	});
	
	it('PizzaBot init variable accessToken should all be a string that is not empty',function(){
		expect(pizzaBot.accessToken).to.be.a('string').to.have.length.above(2);
	});
	
	it('PizzaBot init variable baseUrl should all be a string that is not empty',function(){
		expect(pizzaBot.baseUrl).to.be.a('string').to.have.length.above(2);
	});
});
