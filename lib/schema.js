var Schema = require('mongoose').Schema,
	ObjectId = Schema.ObjectId
;

var Action = new Schema({
	userId: { type: Number, required: true, index: true },
	message: { type: String },
	sequence: [],
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now },
    key:{ type: String , unique:true }
});

module.exports.define = function(mongoose, callback) {
	mongoose.model('Action', Action);
	
	if (callback) {
		callback(mongoose);
	}
}
