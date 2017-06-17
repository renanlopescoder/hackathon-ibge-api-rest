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
	reply: {
		type: String,
		required: false
	},
  questionId: {
    type: Number,
		required: false
  },
  replyFormat: {
    type: String,
		required: false
  }
});

mongoose.model('Collect', schema);
