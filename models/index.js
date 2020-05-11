// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// //Generating Schema
// const userSchema = new Schema({
// 	username: { 
//         type: String, 
//         required: true, 
//     },
// 	password: { 
//         type: String, 
//         required: true, 
//         minlength: [10, "Password not long enough..."],
//     },
//     email: {
//         type: String, 
//         required: true, 
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

module.exports = {
    User: require("./User"),
    Games: require("./Games")
}
