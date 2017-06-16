var http = require('http');
var app = require('./config/express');
require('./config/database');

var port =  process.env.PORT || 3000;

app.listen(port, function(){
	console.log('Server Online, Alfred is up =)');
}); 

