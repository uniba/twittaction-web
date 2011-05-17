
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer(),
	site = {
		com: require("./app/twittaction.com"),
		ac: require("./app/twt.ac")
	};


app.use(express.vhost("twittaction.com", site.com));
app.use(express.vhost("twt.ac", site.ac));

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
