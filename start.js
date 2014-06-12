var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var include = require("includemvc");
var app = include.app();
var config = app.config;
var server = http.createServer(app);

if(config.enableIO) {
	var io = include.lib("socket")(server);
}

mongoose.connect(config.mongodburi);

/** 
 * Load all components enabled in config.components
 * The component must have an index.js present 
 */
var components = config.components;
components.forEach(function(component) {
	app.use(require("./components/" + component));
});

server.listen(app.get('port'), function(){
	console.log(config.mongodburi);
  console.log('Express.js MVC server listening on port ' + app.get('port'));
});