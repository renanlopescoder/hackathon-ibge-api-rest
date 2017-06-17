var mongoose = require('mongoose');

var schema = mongoose.Schema({
  city: {
    type: String,
		required: false
  },
  gini: {
		type: String,
		required: false    
  },
  rank: {
		type: String,
		required: false    
  },
  font: {
		type: String,
		required: false
	}
});

mongoose.model('LifeQuality', schema);
