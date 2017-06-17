var mongoose = require('mongoose');
var api = {};

var model = mongoose.model('User');
var collect = mongoose.model('Collect');
var lifeQuality = mongoose.model('LifeQuality');
var occupation = mongoose.model('Occupation');

function createCollections() {
	model.create({}).then(function (data) {
		res.json(data);
	}, function (error) {
		res.status(404).json(error);
	});

	collect.create({}).then(function (data) {
		res.json(data);
	}, function (error) {
		res.status(404).json(error);
	});

	lifeQuality.create({}).then(function (data) {
		res.json(data);
	}, function (error) {
		res.status(404).json(error);
	});

	occupation.create({}).then(function (data) {
		res.json(data);
	}, function (error) {
		res.status(404).json(error);
	});
}

var questionsList =
	[
		{
			comment: "Olá, sou o Alfred seu assistente pós ENEM e universitário! estou aqui para te ajudar",
			question: "opa, antes de tudo, como posso te chamar?",
			answerFormat: "text",
			questionId: 0,
			delay: 500
		},
		{
			comment: "Muito prazer em te conhecer caro [name], vamos identificar seu perfil, para isso, vou fazer umas perguntas básicas, ok?",
			question: "Qual ano você fez o enem pela última vez?",
			answerFormat: "number",
			questionId: 1,
			delay: 500
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
			question: "Sabia que no RS está com alta na demanda em [course]? falando nisso qual sua cidade?",
			answerFormat: "text",
			questionId: 3,
			delay: 250
		},
		{
			comment: "Legal cidade bonita, tenho ouvido falar que [city] possui uma ótima qualidade vida, mas tudo se torna bem caro em relação as outras cidades do País!",
			question: "Qual sua nota no enem?",
			answerFormat: "text",
			questionId: 4,
			delay: 250
		},
		{
			comment: "Legal cidade bonita, tenho ouvido falar que [city] não possui uma boa qualidade de vida!",
			question: "Qual sua nota no enem?",
			answerFormat: "text",
			questionId: 5,
			delay: 250
		},
		{
			comment: "Legal, vamos ver, olha só que sorte achei algumas faculdades que pode ser interessantes para seu perfil UFBA na Bahia, USP em São Paulo, UNB em Brasília",
			question: "Espero ter ajudado, muito obrigado!",
			answerFormat: "text",
			questionId: 6,
			delay: 250
		},
		{
			comment: "Hahahaha, parece que faz muito tempo em!",
			question: "Qual ano você fez o enem pela última vez?",
			answerFormat: "text",
			questionId: 7,
			delay: 250
		}



	];

	function register (id, callback){
		model
			.findByIdAndUpdate(id)
			.then(function (dado) {

				callback(dado);

			}, function (error) {
				console.log(error);
				res.status(404).json(error);
			});
	}

function generateResponse(questionId, reply, id, callback) {
	console.log(id);
	let response = {};
	let nextQuestion = 0;

	if (questionsList[questionId].questionId == 0) {
		nextQuestion = 1;
		register(id, function(data){
			arrayResult = questionsList[nextQuestion].comment.split("[name]");
			questionsList[nextQuestion].comment = arrayResult[0] + data.name + arrayResult[1];
			callback(questionsList[nextQuestion])
		});
	}

	else if (reply.includes("2016") && questionsList[questionId].questionId == 1) {
		nextQuestion = 2;
		callback(questionsList[nextQuestion])
	}

	else if (reply < 2000 && questionsList[questionId].questionId == 1) {
		nextQuestion = 7;
		callback(questionsList[nextQuestion])
	}

	else if (reply < 2000 && questionsList[questionId].questionId == 7) {
		nextQuestion = 1;
		callback(questionsList[nextQuestion])
	}

	else if (reply.includes("engenharia") && questionsList[questionId].questionId == 2) {
		nextQuestion = 3;
		arrayResult = questionsList[nextQuestion].question.split("[course]");
		questionsList[nextQuestion].question = arrayResult[0] + reply + arrayResult[1];
		callback(questionsList[nextQuestion])
	}

	else if (questionsList[questionId].questionId == 3) {
		
		lifeQuality.findOne({city: reply}, function (error, data) {
			if (error) {
				res.status(500).json(error);
			}
			
			else if (parseInt(data.rank) >= 5) {
				nextQuestion = 5;
				arrayResult = questionsList[nextQuestion].comment.split("[city]");
				questionsList[nextQuestion].comment = arrayResult[0] + reply + arrayResult[1];
			}
			else if (parseInt(data.rank) < 5) {
				nextQuestion = 4;
				arrayResult = questionsList[nextQuestion].comment.split("[city]");
				questionsList[nextQuestion].comment = arrayResult[0] + reply + arrayResult[1];
			}	
			callback(questionsList[nextQuestion]);
		});
	}

	else if (parseInt(reply) >= 800 && questionsList[questionId].questionId == 5) {
		nextQuestion = 6;
		callback(questionsList[nextQuestion]);
	}
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

	collect
		.create(collectReply).then(function (data) {
			generateResponse(req.body.questionId, req.body.reply, req.body.userId, function(data){
				return res.json(data);
			})
		}, function (error) {
			console.log(error);
			res.status(404).json(error);
		});
};

api.getCollectedData = function (req, res) {
	collect.find({}, function (error, data) {
		if (error) {
			res.status(500).json(error);
		}
		res.json(data);
	});
};

api.getLifeQualities = function (req, res) {
	collect.find({}, function (error, data) {
		if (error) {
			res.status(500).json(error);
		}
		res.json(data);
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