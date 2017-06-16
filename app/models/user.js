var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {
		type: String,
		required: false
	},
	age: {
		type: Number,
		required: false
	}
});

mongoose.model('User', schema);
