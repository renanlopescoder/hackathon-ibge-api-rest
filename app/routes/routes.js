module.exports = function (app){

	var api = app.app.api.intelligence;

	app.post('/startChat', api.startChat);
	app.post('/reply', api.reply);
	app.get('/collectedData', api.getCollectedData);
	app.get('/lifequalities', api.getLifeQualities);
};