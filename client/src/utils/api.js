import axios from "axios";

export default {

    getUsers: function() {
        return axios.get("/api/users");
    },

    getUser: function(id) {
        return axios.get("/api/users" + id)
    },

    addUser: function(newUserData) {
        return axios.post("/api/users", newUserData)
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