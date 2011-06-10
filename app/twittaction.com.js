/**
 * Module dependencies.
 */

var express = require('express'),
	app = module.exports = express.createServer();
	mongoose = require('mongoose'),
	schema = require(__dirname + '/../lib/schema')
;

app.configure(function() {
	schema.define(mongoose, function(mongoose) {
		mongoose.connect(process.env.MONGODB_URI);
	});
});

// Routes
app.get('/', function(req, res) {
    
	res.send({ server_name: "twittaction.com" });
});


app.use(express.bodyParser());
// http://havelog.ayumusato.com/develop/javascript/e214-express_post_params.html [引用]2011-05-01 20:39追記：同メソッドの名前が，express バージョン2.3.2時点でbodyParserに変更されているようです．

app.post('/action', function(req, res) {
	
    var userId='';
    var message='';
    var sequence='';
    userId = req.body.userId;
    message =  req.body.message;
    sequence =  req.body.sequence;
    

 
    // http://b.ruyaka.com/2011/03/24/node-jsmongoose%E3%81%A7mongodb%E3%82%92%E8%A9%A6%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B-serversmanvps/
    var Action = mongoose.model('Action');
    var action = new Action();
    action.userId = userId;
    action.message = message;
    action.sequence.push(sequence);
    action.created;
    
    action.save(function(err) {
        if(err){ 
            res.send(err);
        }else{
            //res.send("送信成功しました。");
            
            //var _id = ;
            var short = "http://twt.ac/" + _id
            
            
            res.send(short);
            //res.send({ userId: userId , message:message , sequence:sequence});
        }
    });//action.save(function(err) {
    
});//app.post('/action', function(req, res) {

// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}