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
    app.use(express.bodyParser());
});

// Routes
app.get('/', function(req, res) {
    
	res.send({ server_name: "twittaction.com" });
});

process.on('uncaughtException', function (err) {
  res.send('URLが間違っているようです');
  console.log('uncaughtException => ' + err);
});




// http://havelog.ayumusato.com/develop/javascript/e214-express_post_params.html [引用]2011-05-01 20:39追記：同メソッドの名前が，express バージョン2.3.2時点でbodyParserに変更されているようです．

app.post('/action', function(req, res) {
    console.log('/action body:'+req.body);
    //console.log("Express server listening on port %d", app.address().port);
    //console.log("Express server listening on port %d", app.address().port);
    
    var userId = '' ;
    var message = '' ;
    var sequence = '' ;
    var key = '' ;
    var profile_image_url_https = '' ;
    var formatTime = '' ;
    var screen_name = '' ;
    userId = req.body.userId;
    message =  req.body.message;
    sequence =  req.body.sequence;
    profile_image_url_https = req.body.profile_image_url_https;
    formatTime = req.body.formatTime;
    screen_name = req.body.screen_name;    

    var Action = mongoose.model('Action');
    
    save(userId,message,sequence,Action,profile_image_url_https,formatTime,screen_name,res);//自作関数
    
});//app.post('/action', function(req, res) {

// Only listen on $ node app.js
if (!module.parent) {
	app.listen(3000);
	console.log("Express server listening on port %d", app.address().port);
}

/*
app.post('/action', function(req, res) {});
	の中で使用する関数。
    引数は次のようにする。
    userId = req.body.userId;
    message =  req.body.message;
    sequence =  req.body.sequence;
    var Action = mongoose.model('Action');
    res = res        function(req, res)のres 
    この関数は,
    
    action.save(function(err) {
        if(err){         
            save(userId,message,sequence,Action,profile_image_url_https,res);
        }else{
            //res.send("送信成功しました。");
            res.send(short);
        }
    
    この部分で使う。
*/
function save(userId,message,sequence,Action,profile_image_url_https,formatTime,screen_name,res){
    var userId = userId ;
    var message = message ;
    var sequence = sequence ;
    var profile_image_url_https = profile_image_url_https ;
    var formatTime = formatTime ; 
    var screen_name = screen_name ;
    var key = '';
   
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','m','n','l','o','p','q','r','s','t','u','v','w','x','y','z');
    
    for (var i = 0 ; i <=6  ; i++){
        arrayKey = (Math.floor(Math.random () * 36));
        key += random[arrayKey];
    }
    
     /*
    var random = new Array(0,1,2);
    
    for (var i = 0 ; i <=1  ; i++){
        arrayKey = (Math.floor(Math.random () * 3));
        key += random[arrayKey];
    }//３つの数字の中から、2桁の数字のkeyの組み合わせは 3*3=9 通り。keyが被ったら別のkeyを作成するかのテスト。 すでに、9個のkeyがDBにあったら、無限ループに入る。
    */
    var short = "http://twt.ac/action/" + key;
    var Action = Action;
    
    var action = new Action();
    action.userId = userId ;
    action.message = message ;
    action.sequence.push(sequence) ;
    action.key = key ;
    action.profile_image_url_https = profile_image_url_https ;
    action.formatTime = formatTime ;
    action.screen_name = screen_name ;
    action.save(function(err) {
        if(err){         
            save(userId,message,sequence,Action,profile_image_url_https,formatTime,screen_name,res);
        }else{
            //res.send("送信成功しました。");
            res.send(short);
        }
    });
}

app.post('/update', function(req, res) { 
    console.log(req.body);  
    var key = req.body.key;
    var message = req.body.message;	
    console.log(key);
    console.log(message);
  	var Action = mongoose.model('Action');
  		Action.update({key:key},  { message:message
	 },{ upsert: true, multi: true } ,function(err) {
		console.log('update error:'+err); 
		return;
	 });
    });



app.post('/socialGraph',function(req,res){
    console.log('/socialGraph body:'+req.body);
    var userId='';
    var friends = ''; 

    userId = req.body.userId;
    friends =  req.body.friends;
    
    console.log('/socialGraph userId:'+userId); 
    console.log('/socialGraph friends:'+friends);
    
    var socialGraph = mongoose.model('socialGraph');
    var socialGraph = new socialGraph();
    socialGraph.userId = userId;
    socialGraph.friends = friends;
    socialGraph.save(function(err) {
        if(err){
         console.log('/socialGraph mongoose save error:'+err);       
   	 var updateSocialGraph = mongoose.model('socialGraph');      
	 updateSocialGraph.update( { userId: userId } ,  { friends:friends
         },{ upsert: true, multi: true } ,function(err) {
                console.log('/socialGraph update error:'+err);
                return;
         });
	console.log('/socialGraph update succese');
	 res.send('');
         }else{
          console.log('/socialGraph mongoose save success'); 
          res.send('');
	}
   });
});


// http://d.hatena.ne.jp/KrdLab/20110317/1300367785 参照
// http://webcache.googleusercontent.com/search?q=cache:Aa4nAjbGvI4J:blog.ioi2oloo.me/archives/461+node+mongoose+sort&cd=8&hl=ja&ct=clnk&gl=jp&source=www.google.co.jp
// sort とかの書き方。
//
// http://www.mongodb.org/display/DOCS/Advanced+Queries　
// find の条件式 
app.post('/all',function(req,res){
    console.log('twittaction.com/all;'); 
    var Action = mongoose.model('Action');
   // Use $ne for "not equals"
     Action.find({ message:{$ne:''} },[],{ sort:{modified:-1} , limit : 20 },function(err, docs) { 
       console.log('モンゴエラー:'+err);
      //var allDocs = JSON.parse(docs);
      //console.log('docs:' +  allDocs[0].length );
      if(!err){
	res.send(docs);	
      }
    });
});

app.post('/follow',function(req,res){
    console.log('/follow body:'+req.body);
    var userId='';
    userId = req.body.userId;
    console.log('/follow body.userId:'+userId);

    var socialGraph = mongoose.model('socialGraph'); 
    socialGraph.find( { userId : userId } , function(err,docs){
    console.log('/follow follow Id check モンゴエラー:'+err);
     // var followList = JSON.parse(docs);
    //var check = typeof docs[0].friends;
      console.log('/follow followList1: ' + docs[0].friends );
      console.log('/follow followList1: ' + typeof docs[0].friends );
      console.log('/follow followList2: ' + docs[0].friends[0] );
      console.log('/follow followList2: ' + typeof docs[0].friends[0] );
      console.log('/follow followList3: ' + docs[0].friends[0].split(",") );
      console.log('/follow followList3: ' + typeof docs[0].friends[0].split(",") );
      console.log('/follow followList4: ' + docs[0].friends.toObject() );
      console.log('/follow followList4: ' + typeof docs[0].friends.toObject() );

      var test = docs[0].friends[0].replace(/(\(|\)| *|\n)/gm, "").split(",");
	for (var i in test)
{
console.log("i ->'" + test[i] + "'");
}

      console.log('/follow followList5: ' + Object.prototype.toString.call(test) );
/*
	for (var i in docs[0].friends) {
		console.log('key =>' + i);
		console.log('val =>' + docs[0].friends[i]);
	}

	docs[0].friends.forEach(function(i, n) {
		console.log(arguments);
	});
*/
/*
for (var i in docs[0].friends.split(/,/)){ 
 console.log('/follow followList: ' + i );
} 
*/
     // console.log('/docs: ' + docs[0] );
    if(!err){
//	var followList = [];
//var chk = '' ;	
//chk = docs[0].friends.toString() ;
///	var che = eval(chk) ;
//var replace = chk.replace
var check = typeof docs[0].friends;
console.log('/follow list : ' + check );
//console.log('/follow list : ' + chk );	
//res.send(docs[0].friends);	

		
	var Action = mongoose.model('Action');
	//Action.find({ userId : { $in : [348887022,92686016,54502459,148961902,96684891,124415804,99008565,90521746,96707669,44791521,301187082] } } , [] , { sort:{modified:-1} , limit : 20 } , function(errFollow, docsFollow) {     
test.push(userId);
Action.find({ userId : { $in : test } } , [] , { sort:{modified:-1} , limit : 20 } , function(errFollow, docsFollow) {
	console.log('/follow Action モンゴエラ-:'+errFollow);
        if(!errFollow){
         res.send(docsFollow);
        }
	});
	
      }

    });
/*
    var Action = mongoose.model('Action');
    Action.find({ message:{$ne:''} },[],{ sort:{modified:-1} , limit : 20 },function(err, docs) {  
    console.log('/follow モンゴエラ-:'+err);
      if(!err){
        res.send(docs);
      }
    });
*/
});
 
