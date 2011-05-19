/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var mongoose = require('mongoose');

// Routes
app.get('/', function(req, res) {
	res.send({ server_name: "twittaction.com" });
});

app.post('/action', function(req, res) {
	
});

// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}
