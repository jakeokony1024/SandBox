const mongoose = require("mongoose");
const Schema = mongoose.Schema

const FBUserSchema = new Schema({
  FBId: {
    type: String 
  }, 
  username: {
    type: String 
  }
})

const FBUser = mongoose.model("FBUser", FBUserSchema )
module.exports = FBUser;