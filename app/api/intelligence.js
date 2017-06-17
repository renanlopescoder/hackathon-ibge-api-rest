var mongoose = require('mongoose');
var api = {};

var model = mongoose.model('User');
var collect = mongoose.model('Collect');

var questionsArray =
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
			question: "",
			answerFormat: "text",
			questionId: 2,
			delay: 250
		}
	];

function generateResponse(questionId, reply) {
	let response = {}

	switch (1) {

// CASE 0

		case reply.indexOf("engenharia") !== -1 && questionsArray[questionId].questionId == 2 :
			response = {
				alfred: "Muito bom, no Rio Grande do Sul tem alta demanda nessa área",
				
			}
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 0:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 0:
			break

// CASE 1

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 1:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 1:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 1:
			break

// CASE 2

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 2:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 2:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 2:
			break

// CASE 3

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 3:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 3:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 3:
			break

// CASE 4

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 4:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 4:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 4:
			break

// CASE 5

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 5:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 5:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 5:
			break

// CASE 6

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 6:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 6:
			break

		case reply.indexOf("") !== -1 && questionsArray[questionId].questionId == 6:
			break

	};
	return response
};

api.startChat = function (req, res) {
	model
		.create(req.body).then(function (data) {
			let response = {
				userId: data._id,
				comment: questionsArray[0].comment,
				question: questionsArray[0].question,
				questionId: 0,
				answerFormat: questionsArray[0].answerFormat,
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
			question: questionsArray[req.body.questionId].question,
			reply: req.body.reply
		};

	collect
		.create(collectReply).then(function (data) {

			

			res.json(generateResponse(req.body.questionId, req.body.reply));
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