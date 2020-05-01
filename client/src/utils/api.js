import axios from "axios";
require('dotenv').config();
export default {

    getGameSearch: function() {
        console.log(process.env);
        console.log(process.env.REACT_APP_RAWG_KEY);
            return axios({
                "method":"GET",
                "url":"https://rawg-video-games-database.p.rapidapi.com/games",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"rawg-video-games-database.p.rapidapi.com",
                "x-rapidapi-key":process.env.REACT_APP_RAWG_KEY
                }
                })
                .then((response)=>{
                    console.log(response)
                })
                .catch((error)=>{
                    console.log(error)
                })
    },

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