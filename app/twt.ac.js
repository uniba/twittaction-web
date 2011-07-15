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
    
//<<<<<<< HEAD
    
    
//=======

//>>>>>>> 004bc73a865327e5c1a1a3e12966b3b1d89da387
    Action.find({key:key}, function(err, docs) {
       // res.send(docs);
       /*これをやると、取得したデータが一覧表示される。jsonみたい。
       *
       */
    
    // エラー処理 なんかうまくいかない。エラーが起こっても、落ちなくなったが、send するのは1回だけ
   process.on('uncaughtException', function (err) {
             res.send('URLが間違っているようです');
          console.log('uncaughtException => ' + err);


    });




       //以下のhtml ファイルは改行すると SyntaxError になる。
       res.send('<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" /><title>Twittaction</title><link rel="stylesheet" href="http://twittaction.com/movement/css/basic.css"/><script src="http://twittaction.com/movement/js/jquery.1.6.js"></script><script src="http://twittaction.com/movement/js/jsdeferred.js"></script><script src="http://twittaction.com/movement/js/move.js"></script><script src="http://twittaction.com/movement/js/twittaction.js"></script></head><body> <!-- <header>    <h1>Twittaction</h1>  </header> --> ' + docs[0].message + '<div id="wrapper">    <div id="stage">      <div class="inner">        <div id="cube">          <div class="inner" id="cube-inner">            <div class="side-a"></div>            <div class="side-b"></div>            <div class="side-c"></div>            <div class="side-d"></div>            <div class="side-e"></div>            <div class="side-f"></div>          </div>        </div>      </div>    </div>  </div>  <script>var tmp ='       +docs[0].sequence[0]+       '; var data = [];    for (var i = 0, len = tmp["X"].length; i < len; i++) {        data.push({            x: tmp["X"][i] * 5,            y: tmp["Y"][i] * 5,            z: tmp["Z"][i] * 5        });    };    Twittaction("cube-inner").add(data).execute();  $(document).ready(function(){        $("#cube div:not(.inner)").css("background-image"," url(\\" ' + docs[0].profile_image_url_https + ' \\") ");    }); </script></body></html>')
    });
    
});//app.get('/action/:key', function(req, res ,next) {


// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}

