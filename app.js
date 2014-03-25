/**
 * @file exposes the app object instantiated so other components and files can
 * require it and share events across the entire application
 */

var express = require("express");
var include = require("includemvc");
var config = include.path("config", "config.json");
var app = module.exports = exports = express();
var path = require("path");
var mvc = require("expressjsmvc");
var flash = require("express-flash");

// Alloy all configuration to be available in app.config
app.config = config;

// all environments
mvc.EnableMultipeViewsFolders(app);
app.set('port', process.env.PORT || 3000);
app.set('views', [path.join(__dirname, 'views')]);
app.set('view engine', 'jade');
app.locals.basedir = path.join(__dirname, 'views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/** 
 * Autodetect all views in components 
 */
var components = config.components;
components.forEach(function(component) {
	mvc.addView(app, path.join(__dirname, "components", component));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}