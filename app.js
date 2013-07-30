/**
 * Module dependencies.
 */
// require.paths.unshift('./node_modules');
var express = require('express');
var app = module.exports = express.createServer(),
	site = {
		com: require("./app/twittaction.com"),
		ac: require("./app/twt.ac")
	};

// Configuration
app.configure(function() {
	//app.set('views', __dirname + '/views');
	//app.set('view engine', 'jade');
	//app.use(require('stylus').middleware({ src: __dirname + '/public' }));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	app.use(express.vhost("twittaction_dev", site.com));
	app.use(express.vhost("twt_dev", site.ac));
});

app.configure('production', function() {
	app.use(express.errorHandler()); 
	app.use(express.vhost("twittaction.com", site.com));
	app.use(express.vhost("twt.ac", site.ac));
});

// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
	site.com.listen(3001);
	console.log("Express server listening on port %d", site.com.address().port);
	site.ac.listen(3002);
	console.log("Express server listening on port %d", site.ac.address().port);
}
