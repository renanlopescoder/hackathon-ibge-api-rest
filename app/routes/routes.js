module.exports = function (app){

	var api = app.app.api.intelligence;

	app.post('/startChat', api.startChat);
	app.post('/reply', api.reply);

	// app.get('/list/mvpData', api.lista);
	// app.post('/update/mvpData/:id', api.update);
	// app.get('/select/mvpData/:id', api.buscaPorId);
	// app.delete('/delete/mvpData/:id', api.removePorId);
};