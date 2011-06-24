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
    var key = '';
    userId = req.body.userId;
    message =  req.body.message;
    sequence =  req.body.sequence;
    var Action = mongoose.model('Action');
    
    save(userId,message,sequence,Action,res);//自作関数
    
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
            save(userId,message,sequence,Action,res);
        }else{
            //res.send("送信成功しました。");
            res.send(short);
        }
    
    この部分で使う。
*/
function save(userId,message,sequence,Action,res){
    var userId = userId;
    var message = message;
    var sequence = sequence;
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
    var short = "http://twt_dev:3000/action/" + key;
    var Action = Action;
    
    var action = new Action();
    action.userId = userId;
    action.message = message;
    action.sequence.push(sequence);
    action.key = key;
    
    action.save(function(err) {
        if(err){         
            save(userId,message,sequence,Action,res);
        }else{
            //res.send("送信成功しました。");
            res.send(short);
        }
    });
}
