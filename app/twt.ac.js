/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

// Routes
app.get('/', function(req, res) {
	res.send({ server_name: "twt.ac" });
});

// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}
