const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String, 

    },
    image: {
        type: String, 

    }
})

const Games = mongoose.model("Games", gameSchema);

module.exports = Games;