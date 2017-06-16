var mongoose = require('mongoose');
var api = {};

var model = mongoose.model('User');
var collect = mongoose.model('Collect');

api.lista = function (req, res){
	model.find({},function(error, lista){
		if(error){
			res.status(500).json(error);
		}
		res.json(lista);
	});

};

api.create = function(req, res){
	model
		.create(req.body).then(function(data){
			var response = {
				userId: data._id,
				question: "Olá, sou o Alfred como você se chama?",
				questionId: 1,
				format: "text",
				delay: 500,
			}
		res.json(response);
	}, function(error){
		console.log(error);
		res.status(404).json(error);
	});
};

api.buscaPorId = function(req,res){

	model
		.findById(req.params.id)
		.then(function(id){
			if(!id) throw Error("Não encontrada");

			res.json(dadoEncontrado);

		}, function(error){
		console.log(error);
		res.status(404).json(error);
	});

};

api.removePorId = function(req,res){
	model.remove({_id: req.params.id})
	.then(function(){
		res.sendStatus(204);
	}, function(error){
		console.log(error);
		res.status(404).json (error);
	});

};

api.update = function(req,res){
 console.log(req.body);
	model
		.findByIdAndUpdate(req.params.id, req.body)
		.then(function(dado){
			
			res.json(dado);

		}, function(error){
		console.log(error);
		res.status(404).json(error);
	});

};




module.exports = api;