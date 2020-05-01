const mongoose = require("mongoose");
const db = require("../models");

//This file empties the Items & Users collections and inserts the items & users below

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/SandBox",
	{ useNewUrlParser: true }
);

const userSeed = [
	{
		firstName: "jacob",
		lastName: "okony",
		username: "jakeokony",
		password: "password",
		email: "jakeokony@gmail.com",
		mainPlatform: "Playstation-4",
		date: new Date(Date.now()),
	},
	{
		firstName: "sara",
		lastName: "johns",
		username: "saramay",
		password: "password1",
		email: "saramay@gmail.com",
		mainPlatform: "Playstation-4",
		date: new Date(Date.now()),
	},
];

db.User.remove({})
	.then(() => db.User.collection.insertMany(userSeed))
	.then((data) => {
		console.log(data.result.n + " records inserted!");
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

module.exports = userSeed;