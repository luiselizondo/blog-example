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

var address = process.env.MONGODB_PORT_27017_TCP_ADDR;
var port = process.env.MONGODB_PORT_27017_TCP_PORT;
mongoose.connect("mongodb://" + address + ":" + port + "/blog");

/** 
 * Load all components enabled in config.components
 * The component must have an index.js present 
 */
var components = config.components;
components.forEach(function(component) {
	app.use(require("./components/" + component));
});

server.listen(app.get('port'), function(){
  console.log('Express.js MVC server listening on port ' + app.get('port'));
});