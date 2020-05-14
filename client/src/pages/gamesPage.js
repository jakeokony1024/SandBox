import React, { Component } from "react";
import { Row, Col} from "../components/Grid";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import api from "../utils/api";
import Button from "components/CustomButtons/Button.js";
import Card from "../components/Card/Card";

import DeleteBtn from "components/DeleteBtn";
import {Link} from "react-router-dom"

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            savedGames: [],
            name: "",
            background_image: "",
            searchResult: []
        }
    }
    componentDidMount() {
        this.gameGet();
    }
    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
        this.setState({ 
            [name]: value,
            search: event.target.value 
        })
    }
    handleFormSubmit = event => {
        event.preventDefault();
        axios( {
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/games?search=" +this.state.search,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAWG_KEY,
            "useQueryString":true
            }
            })
            .then((response)=>{
            let searchedGame = response.data.results[0].name
            let searchedGameImg = response.data.results[0].background_image
            this.setState({
                searchResult: searchedGame,
                background_image: searchedGameImg, 
                search: ""
            })
            })
            .catch((error)=>{
            console.log(error)
            })
    }
    handleButtonCLick = event => {
        event.preventDefault();
        this.gamePost();
        this.setState({
            search: " ",
            background_image: "",
            searchResult: []
        })
        this.gameGet()
    }
    deleteGame = (id) => {
        api.deleteGame(id)
        .then((res) => this.gameGet())
        .catch((err) => console.log(err));
    }
    gamePost = () => {
        let gameObject = {
            name: this.state.searchResult,
            image: this.state.background_image
        }
        api.addGame(gameObject)
        .then(res => (gameObject))
        .catch((err) => console.log(err))
    }
    gameGet = () => {
        api.getGames()
        .then((res) =>
            this.setState({
                savedGames: res.data
            })
        )
        .catch((err) => console.log(err));
    }
    render() {
        return (
            <div className="container1">
                <div className="container2">
                    <div className="container3">
                    <Row>
                        <Col size = "md-12">
                            <Card>
                                <SearchForm
                                value = {this.state.search}
                                handleInputChange = {this.handleInputChange}
                                handleFormSubmit = {this.handleFormSubmit}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col size = "md-12">
                            <Card>
                                <h5 
                                color="transparent" 
                                style={{textAlign: "center"}}
                                >
                                Game: {this.state.searchResult}
                                </h5>
                                    <img 
                                    src={this.state.background_image} 
                                    alt=""
                                    style={{
                                        boxSizing: "border-box",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                    />
                                    <Button 
                                    onClick = {this.handleButtonCLick}>
                                        Save Game
                                    </Button>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col size = "md-12">
                            {this.state.savedGames.length > 0 ? (
                                <div>
                                {this.state.savedGames.map((savedGame) => (
                                    <Card key = {savedGame._id}>
                                    <Link to ={"/games/" + savedGame._id}>
                                    <h5
                                    color="transparent" 
                                    style={{textAlign: "center"}}>
                                        {savedGame.name}
                                    </h5>
                                    <img 
                                    src = {savedGame.image}
                                    alt=""
                                    style={{
                                        boxSizing: "border-box",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                    />
                                    </Link>
                                    <DeleteBtn onClick={()=> this.deleteGame(savedGame._id)}/>
                                    </Card>
                                ))}
                                </div>
                            ):(
                            <h3>No Results to Display</h3>
                            )}
                        </Col>
                    </Row>
                    </div>
                </div>
            </div>
        )
    }
}
export default GamePage;