import React, { Component } from "react";
import { Row, Col} from "../components/Grid";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import api from "../utils/api";
import Button from "components/CustomButtons/Button.js";
import Card from "../components/Card/Card";
import CardHeader from "components/Card/CardHeader.js";
import {ListItem } from "../components/List";
import DeleteBtn from "components/DeleteBtn";

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
        this.setState({ 
            search: event.target.value.split(" ").join("-").toLowerCase()
        })
        console.log(this.state.search)
    }
    handleFormSubmit = event => {
        event.preventDefault();
        axios(this.state.search, {
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/games/" + this.state.search,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAWG_KEY
            }
            })
            .then((response)=>{
                console.log(response)
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
            search: "",
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
            }),
            console.log(this.state.savedGames)
        )
        .catch((err) => console.log(err));
    }
    render() {
        return (
            <div className="container1">
                <div className="container2">
                    <div className="container3">
                    <Row>
                        <Col size = "md-4">
                            <Card>
                                <SearchForm
                                value = {this.state.search}
                                handleInputChange = {this.handleInputChange}
                                handleFormSubmit = {this.handleFormSubmit}
                                />
                            </Card>
                        </Col>
                        <Col size = "md-4">
                            <Card>
                                <CardHeader color="transparent" style={{textAlign: "center"}}>
                                <h3>Game: {this.state.searchResult}</h3>
                                </CardHeader>
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
                        <Col size = "md-4">
                            {this.state.savedGames.length > 0 ? (
                                <Card>
                                {this.state.savedGames.map((savedGame) => (
                                    <ListItem key = {savedGame._id}>
                                    <CardHeader
                                    color="transparent" 
                                    style={{textAlign: "center"}}>
                                        {savedGame.name}
                                    </CardHeader>
                                    <img 
                                    src = {savedGame.image}
                                    alt=""
                                    style={{
                                        boxSizing: "border-box",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                    />
                                    <DeleteBtn onClick = {this.deleteGame}/>
                                    </ListItem>
                                ))}
                                </Card>
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