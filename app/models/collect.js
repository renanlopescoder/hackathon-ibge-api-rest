var mongoose = require('mongoose');

var schema = mongoose.Schema({
  userId: {
		type: String,
		required: false
	},
	question: {
		type: String,
		required: false
	},
	answer: {
		type: String,
		required: false
	},
  questionType: {
    type: Number,
		required: false
  }
});

mongoose.model('Collect', schema);
