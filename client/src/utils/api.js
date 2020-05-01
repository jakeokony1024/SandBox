import axios from "axios";
require('dotenv').config();
export default {

    getUsers: function() {
        return axios.get("/api/users");
    },

    getUser: function(id) {
        return axios.get("/api/users" + id)
    },

    addUser: function(newUserData) {
        return axios.post("/api/users", + newUserData)
    }
}