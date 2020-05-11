const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.User
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
	findById: function (req, res) {
		db.User.find({ _id: req.params.id })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.json(err));
	},
	create: function (req, res) {
		db.User.create(req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.json(err));
	},
	update: function (req, res) {
		db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.json(err));
	},
	remove: function (req, res) {
		db.User.findById({ _id: req.params.id })
			.then((dbModel) => dbModel.remove())
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.json(err));
	},
	getSavedGames: function(req, res){
		db.Games
		.find(req.query)
		.sort({date: -1})
		.then(dbGameModel => res.json(dbGameModel))
		.catch(err => res.json(err))
	}, 
	postSavedGames: function(req, res){
		db.Games 
		.create(req.body)
		.then((dbGameModel) => res.json(dbGameModel))
		.catch((err) => res.json(err))	
	},
	deletGames: function (req, res){
		db.Games.findById({_id: req.params.id})
		.then((dbGameModel)=> dbGameModel.remove())
		.then((dbGameModel) => res.json(dbGameModel))
		.catch((err)=> (err))
	}
}