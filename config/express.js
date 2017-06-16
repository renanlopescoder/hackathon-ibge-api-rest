var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var load = require('express-load');
var cors = require('cors');

//Configurações do Express

app.use(cors({origin: '*'}));

	app.set('secret', 'opensecret');
	app.use(express.static('./public'));

	load('app/models')
	.then('app/api')
	.then('app/routes')
	.into(app);

	module.exports = app;

