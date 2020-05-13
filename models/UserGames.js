const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserGamesSchema = new Schema({
    userID: {
      type: String 
    }, 
    savedGameId: {
      type: String 
    }
})

const UserGames = mongoose.model("UserGames", UserGamesSchema )
module.exports = UserGames;