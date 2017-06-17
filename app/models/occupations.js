var mongoose = require('mongoose');

var schema = mongoose.Schema({
  region: {
    type: String,
		required: false
  },
  occupation: {
		type: Array,
		required: false    
  },
  font: {
		type: String,
		required: false    
  }
});

mongoose.model('Occupation', schema);
