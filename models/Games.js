const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String, 
        // required: true
    },
    image: {
        type: String, 
        // required: true
    }
})

const Games = mongoose.model("Games", gameSchema);

module.exports = Games;