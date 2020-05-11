// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// //Generating Schema
// const userSchema = new Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
// 	username: { 
//         type: String, 
//         required: true, 
//     },
// 	password: { 
//         type: String, 
//         required: true, 
//     },
//     email: {
//         type: String, 
//         required: true, 
//     },
//     mainPlatform: {
//         type: String,
//         required: true
//     },
// 	date: { 
//         type: Date, 
//         default: Date.now
//     },
// });

// //Setting schema to variable
// const User = mongoose.model("User", userSchema);

// //Exporting
// module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("users", UserSchema);