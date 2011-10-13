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
	// テンプレートエンジンejsの設定
	var ejs = require('ejs');
	app.set('view engine', 'ejs');
	app.set('view options', { layout: false });
	app.set('views', __dirname + '/../views');
        
	});
});

   process.on('uncaughtException', function (err) {
//             res.send('URLが間違っているようです');
          console.log('uncaughtException => ' + err);
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
  console.log('キーの長さ:'+key.length); 
   if(key.length!=7){
   res.send('<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" /><title>Twittaction エラー</title></head><body>間違ったURLです。(キーの長さが違う)</body></html>');
       
   }else{
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
  // process.on('uncaughtException', function (err) {
    //         res.send('URLが間違っているようです');
      //    console.log('uncaughtException => ' + err);


   // });
   //
   //
   //
  // res.send(docs);
   console.log('モンゴエラー:'+err);
   console.log('docs:' +  docs[0] );
	if(docs[0] == undefined ){
		res.send('誤ったURLです。(キーが違う。) ');
	}else{

	var sequence = JSON.parse(docs[0].sequence[0]);
	//var check = typeof sequence;
	//console.log("表示");
	//console.log(sequence.X);
	//console.log('docs[0].message:'+docs[0].message);
	//console.log('docs[0].modified'+docs[0].modified);
      // console.log('docs:'+docs);
			var message =  docs[0].message;
			var modified = docs[0].modified;
			var sequence = docs[0].sequence[0];
			var profile_image_url_https = docs[0].profile_image_url_https;
			// 描画
			res.render('viewAction.ejs', {locals:{message:message,modified:modified,sequence:sequence,profile_image_url_https:profile_image_url_https}});
   
	}
  });

	
  } //else{

    
});//app.get('/action/:key', function(req, res ,next) {


// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}

