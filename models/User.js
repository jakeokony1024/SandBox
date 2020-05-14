const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Generating Schema
const userSchema = new Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
	email: { 
        type: String, 
        // required: true, 
    },
	password: { 
        type: String, 
        // required: true, 
    },
    confirmPassword: {
        type: String, 
        // required: true, 
    },
    mainPlatform: {
        type: String,
        // required: true
    },
    handle: {
        type: String,
    },
    gamerTag: {
        type: String
    },
	date: { 
        type: Date, 
        default: Date.now
    },
});

//Setting schema to variable
const User = mongoose.model("User", userSchema);

//Exporting
module.exports = User;