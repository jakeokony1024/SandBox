const mongoose = require("mongoose");
const db = require("../models");

//This file empties the Items & Users collections and inserts the items & users below

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/SandBox",
	{ useNewUrlParser: true }
);

const userSeed = [
	{
		username: "jakeokony",
		password: "password",
		email: "jakeokony@gmail.com",
		date: new Date(Date.now()),
	},
	{
		username: "saramay",
		password: "password12",
		email: "saramay@gmail.com",
		date: new Date(Date.now()),
	},
];

db.Item.remove({})
	.then(() => db.Item.collection.insertMany(itemSeed))
	.then((data) => {
		console.log(data.result.n + " records inserted!");
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

module.exports = userSeed;