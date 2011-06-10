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
	res.send({ server_name: "twt.ac" });
});


app.get('/action/:key', function(req, res) {
        
    /* プログラムでは、「/action/:key」　のように、「:」　が書いてあるが、
     * 入力する、url　では、「:」を入力する必要がない！
     * そのまま取得できる。
     */

	// http://expressjs.com/guide.html#routing の Route Param Pre-conditions
    // http://hideyukisaito.com/doc/expressjs/guide/ ルート・パラメータの事前処理
    // http://blog.starbug1.com/archives/854 少し参考になる
    
    
    var key=req.params.key;
    
    /* http://b.ruyaka.com/2011/03/24/node-jsmongoose%E3%81%A7mongodb%E3%82%92%E8%A9%A6%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B-serversmanvps/
     *下の方のコード
    */
    // http://d.hatena.ne.jp/KrdLab/20110317/1300367785
    // http://mongoosejs.com/docs/api.html model の finds document
    var Action = mongoose.model('Action');
    Action.find({key:key}, function(err, docs) {
       /*res.send(docs);
       * これをやると、取得したデータが一覧表示される。jsonみたい。
       *
       */
       res.send(docs[0].sequence);
    });
    
});//app.get('/action/:key', function(req, res ,next) {


// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}
