var mongoose = require('mongoose');

var schema = mongoose.Schema({
	dados1: {
		type: String,
		required: false
	},
	dados2: {
		type: String,
		required: false
	},
	dados3: {
		type: String,
		required: false
	},
	dados4: {
		type: String,
		required: false
	} 
});

mongoose.model('Data', schema);
