var Schema = require('mongoose').Schema,
	ObjectId = Schema.ObjectId
;

var Action = new Schema({	
	userId: { type: Number, required: true, index: true },
	message: { type: String },
	sequence: [],
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now },
	key:{ type: String , unique:true },
	profile_image_url_https: { type: String, default: '' },
	formatTime:{type: String , default:'' },
	screen_name:{type:String , default:'' }	

});

var socialGraph = new Schema({
        userId: { type: Number,  index: true , unique:true },
        friends: [] ,
        created: { type: Date, default: Date.now },
        modified: { type: Date, default: Date.now }
});

module.exports.define = function(mongoose, callback) {
	mongoose.model( 'Action', Action );
	mongoose.model( 'socialGraph', socialGraph );	
	if (callback) {
		callback(mongoose);
	}
}

