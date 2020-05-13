import axios from "axios";

export default {

    getUsers: function() {
        return axios.get("/api/fbuser");
    },

    getUser: function(id) {
        return axios.get("/api/fbuser" + id)
    },

    addUser: function(newUserData) {
        return axios.post("/api/fbuser", newUserData)
    },

    getGames: function() {
        return axios.get("/api/games")
    },

    addGame: function(newGameData) {
        return axios.post("/api/games", newGameData)
    },
    deleteGame: function(id) {
        return axios.remove("/api/games" + id)
    }
}