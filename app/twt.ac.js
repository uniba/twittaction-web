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
       res.send('<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" /><title>Twittaction</title><link rel="stylesheet" href="http://twittaction.com/movement/css/basic.css"/><script src="http://twittaction.com/movement/js/jquery.1.6.js"></script>.<script src="http://twittaction.com/movement/js/jsdeferred.js"></script><script src="http://twittaction.com/movement/js/move.js"></script><script src="http://twittaction.com/movement/js/twittaction.js"></script><script src="http://twittaction.com/movement/js/drawlib/jsDraw2D.js"></script><script src="http://twittaction.com/movement/js/drawlib/accel.js"></script><script>function timeChenge(time){var time = new Date(time);var yy = time.getYear();var  mm = time.getMonth() + 1;var  dd = time.getDate();var  tt= time.getHours();var  mi= time.getMinutes();var  ss=time.getMinutes();if (yy < 2000) { yy += 1900; } if (mm < 10) { mm = "0" + mm; } if (dd < 10) { dd = "0" + dd; } if (tt < 10) { tt = "0" + tt; } if (mi < 10) { mi = "0" + mi; }var pub_day = mm + "-" + dd + " " + tt + ":" + mi ;return pub_day;} </script><script>UA_myArrayX = ['+sequence.X+'];UA_myArrayY =['+sequence.Y+'];UA_myArrayZ = ['+sequence.Z+'];for(i=0;i<UA_myArrayX.length;i++){setTimeout ("onAlert(UA_myArrayX["+i+"],UA_myArrayY["+i+"],UA_myArrayZ["+i+"]);",i*150)}</script> <style>body {background-color: black} div#tweet{  font-size: 12px; background-image: url("http://twittaction.com/movement/images/fukidashi1.png"); position: relative; top: 0%; height:110px; background-repeat: no-repeat ;background-size:100% 100%; }  .time{ color: red; right:25px;position:absolute;}</style></head><body> <!-- <header>    <h1>Twittaction</h1>  </header> --><div id="tweet"> ' + docs[0].message + ' <br> <span class="time"><script>document.write(timeChenge("' + docs[0].modified + '"));</script></span></div> <div id="wrapper">   <div id="stage">      <div class="inner">        <div id="cube">          <div class="inner" id="cube-inner">            <div class="side-a"></div>            <div class="side-b"></div>            <div class="side-c"></div>            <div class="side-d"></div>            <div class="side-e"></div>            <div class="side-f"></div>        </div>        </div>      </div>    </div>  </div>  <script>var tmp ='+docs[0].sequence[0]+'; var data = [];    for (var i = 0, len = tmp["X"].length; i < len; i++) {        data.push({            x: tmp["X"][i] * 5,            y: tmp["Y"][i] * 5,            z: tmp["Z"][i] * 5        });    };    Twittaction("cube-inner").add(data).execute();  $(document).ready(function(){        $("#cube div:not(.inner)").css("background-image"," url(\\"'+ docs[0].profile_image_url_https +'  \\") ");    }); </script><div id="canvasAccel" style="overflow:visible;position:relative;bottom:0%"></div>  </body></html>');
   
	}
  });

	
  } //else{

    
});//app.get('/action/:key', function(req, res ,next) {


// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}

