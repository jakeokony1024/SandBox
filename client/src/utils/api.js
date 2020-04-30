import axios from "axios";
import {IGDB_KEY} from "react-native-dotenv";

export default {

    getGameSearch: function() {
    let searchbar = process.argv[2];
	    return axios({ 
            url: "https://api-v3.igdb.com/games",
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json',
                'user-key': IGDB_KEY
            },
            data: `'fields name; search "${searchbar}"; limit 15;'`
	    })
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    },

    getUsers: function() {
        return axios.get("/api/users");
    }
}