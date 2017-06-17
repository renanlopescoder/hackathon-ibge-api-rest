var mongoose = require('mongoose');
var api = {};

var model = mongoose.model('User');
var collect = mongoose.model('Collect');

var questionsList =
	[
		{
			comment: "Olá, sou o Alfred seu assistente pós ENEM e universitário! estou aqui para te ajudar",
			question: "opa, antes de tudo, como posso te chamar?",
			answerFormat: "text",
			questionId: 0,
			delay: 250
		},
		{
			comment: "Muito prazer em te conhecer caro [var], vamos identificar seu perfil, para isso, vou fazer umas perguntas básicas, ok?",
			question: "Quando você fez o enem pela última vez?",
			answerFormat: "number",
			questionId: 1,
			delay: 250
		},
		{
			comment: "Ahhh! ainda lembro daquele ENEM, aquele tema da redação sobre Intolerância Religiosa, me faz refletir até hoje!", 
			question: "Ano passado eu queria fazer análise de robô, esse ano já não quero mais e você qual curso gostaria de fazer?",
			answerFormat: "text",
			questionId: 2,
			delay: 250
		},
		{
			comment: "", 
			question: "Sabia que no [estado] está com alta na demanda para sua profissão? só que lá faz [clima], falando nisso qual sua cidade?",
			answerFormat: "text",
			questionId: 3,
			delay: 250
		},
		{
			comment: "Legal cidade bonita, tenho ouvido falar que [cidade] possui uma ótima qualidade vida, mas tudo se torna bem caro em relação as outras cidades do País!", 
			question: "Qual sua nota no enem?",
			answerFormat: "text",
			questionId: 4,
			delay: 250
		},
		{
			comment: "Legal, vamos ver, olha só que sorte achei [tres] faculdades x, y e z", 
			question: "Espero ter ajudado, muito obrigado!",
			answerFormat: "text",
			questionId: 5,
			delay: 250
		},
	];

function generateResponse(questionId, reply) {
	let response = {}
	
		if (questionsList[questionId].questionId == 0) 
			response = questionsList[questionId + 1];
		else if (reply.includes("2016") && questionsList[questionId].questionId == 1)
			response = questionsList[questionId + 1]
		else if (reply.includes("engenharia") && questionsList[questionId].questionId == 2)
			response = questionsList[questionId + 1]
		else if (reply.includes("brasilia") && questionsList[questionId].questionId == 3)
			response = questionsList[questionId + 1]
		else if (parseInt(reply) >= 800 && questionsList[questionId].questionId == 4)
			response = questionsList[questionId + 1]

	return response
};

api.startChat = function (req, res) {
	model
		.create(req.body).then(function (data) {
			let response = {
				userId: data._id,
				comment: questionsList[0].comment,
				question: questionsList[0].question,
				questionId: 0,
				answerFormat: questionsList[0].answerFormat,
				delay: 500,
			}
			res.json(response);
		}, function (error) {
			console.log(error);
			res.status(404).json(error);
		});
};

api.reply = function (req, res) {

	let collectReply =
		{
			userId: req.body.userId,
			questionId: req.body.questionId,
			question: questionsList[req.body.questionId],
			reply: req.body.reply
		};
		console.log(req.body)
		var responseTheReply = generateResponse(req.body.questionId, req.body.reply);
		
	collect
		.create(collectReply).then(function (data) {
			res.json(responseTheReply);
		}, function (error) {
			console.log(error);
			res.status(404).json(error);
		});
};

api.lista = function (req, res) {
	model.find({}, function (error, lista) {
		if (error) {
			res.status(500).json(error);
		}
		res.json(lista);
	});

};

api.buscaPorId = function (req, res) {

	model
		.findById(req.params.id)
		.then(function (id) {
			if (!id) throw Error("Não encontrada");

			res.json(dadoEncontrado);

		}, function (error) {
			console.log(error);
			res.status(404).json(error);
		});

};

api.removePorId = function (req, res) {
	model.remove({ _id: req.params.id })
		.then(function () {
			res.sendStatus(204);
		}, function (error) {
			console.log(error);
			res.status(404).json(error);
		});

};

api.update = function (req, res) {
	console.log(req.body);
	model
		.findByIdAndUpdate(req.params.id, req.body)
		.then(function (dado) {

			res.json(dado);

		}, function (error) {
			console.log(error);
			res.status(404).json(error);
		});

};




module.exports = api;