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
	console.log('docs[0].message:'+docs[0].message);
	console.log('docs[0].modified'+docs[0].modified);
      // console.log('docs:'+docs);

       //以下のhtml ファイルは改行すると SyntaxError になる。
       res.send('<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8">	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" />	<title>Twittaction</title>	<link rel="stylesheet" href="http://twittaction.com/movement/css/basic.css"/>	<script src="http://twittaction.com/movement/js/jquery.1.6.js"></script>	<script src="http://twittaction.com/movement/js/jsdeferred.js"></script>	<script src="http://twittaction.com/movement/js/move.js"></script>	<script src="http://twittaction.com/movement/js/twittaction.js"></script>	<style>	</style></head><body><div id="tweet">  '+docs[0].message+' <br> 		<span class="time">			<script>document.write(timeChenge("' + docs[0].modified + '"));</script>		</span>	</div>   <div id="wrapper">    	<div id="stage">		<div id="progressbar"></div>  		<div class="inner">        			<div id="cube">          				<div class="inner" id="cube-inner">            					<div class="side-a"></div>            					<div class="side-b"></div>            					<div class="side-c"></div> <div class="side-d"></div>            					<div class="side-e"></div>            					<div class="side-f"></div>					<div class="birdfoot"></div>     				</div>        			</div>      		</div>    	</div>  </div>  <script>var elemCube = document.getElementById("cube-inner"),	elemPbar = document.getElementById("progressbar");var data = new Object();var dataPos = 0;var startTime = 0;var currentTime = 0;var thi = -1;var tmp = '+docs[0].sequence[0]+'; insertData(tmp);imageUrl("'+docs[0].profile_image_url_https+'");function insertData(accelData){	data = accelData;	var now = new Date();	startTime = now.getTime();	setInterval("executeAction()",10);};function executeAction(){	var now = new Date();	currentTime = now.getTime();			if (data["timeFromStart"][dataPos] * 1000 < (currentTime - startTime)) {		dataPos ++;	}			if (data["X"].length <= dataPos) {		dataPos = 0;		startTime = currentTime;	}		var x  = data["X"][dataPos],    	y  = data["Y"][dataPos],    	z  = data["Z"][dataPos],    	th = data["trueHeading"][dataPos],    	tt = data["timestamp"][dataPos],   		ct = data["timeFromStart"][dataPos];		if ((th != void 0) && (thi == -1)) {   		thi = th;   	}		var xradtemp = ( Math.atan2(y,z) + Math.PI/2);   	var yradtemp = (-Math.atan2(z,x) - Math.PI/2);   	var zradtemp = (-Math.atan2(y,x) - Math.PI/2);		var xrad = ( Math.atan2(y * Math.abs(Math.cos(xradtemp)), z * Math.abs(Math.sin(xradtemp))) + Math.PI/2);	var yrad = (-Math.atan2(z * Math.abs(Math.cos(yradtemp)), x * Math.abs(Math.sin(yradtemp))) - Math.PI/2);	var zrad = (-Math.atan2(y * Math.abs(Math.cos(zradtemp)), x * Math.abs(Math.sin(zradtemp))) - Math.PI/2); 	    var xdeg = xrad * 180 / Math.PI;    var ydeg = yrad * 180 / Math.PI;    var zdeg = zrad * 180 / Math.PI;    xdeg += 45;    zdeg += thi - th;    	elemCube.style.webkitTransform = "rotateX(" + xdeg + "deg) " +	"rotateY(" + ydeg + "deg) " + "rotateZ(" + zdeg + "deg)";		elemPbar.style.width = (100 - (ct/(ct+tt) * 100))+ "%";}; function imageUrl(url){    var i = \'url("\'+ url +\'")\';     $(".side-a").css("background-image",i);}</script></body></html>');
   
	}
  });

	
  } //else{

    
});//app.get('/action/:key', function(req, res ,next) {


// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}

