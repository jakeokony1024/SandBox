import React, { Component } from "react";
import {Container, Row, Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import api from "../utils/api";
import Button from "components/CustomButtons/Button.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "../components/Card/Card";
import CardHeader from "components/Card/CardHeader.js";
import {ListItem} from "../components/List";
import { Link } from "react-router-dom";

const dashboardRoutes = [];

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            savedGames: [{}],
            name: "",
            background_image: "",
            searchResult: []

        }
    }
    componentDidMount() {
        this.gameGet();
        console.log(this.state.savedGames)
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
        axios(this.state.search, {
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/games?search=" + this.state.search,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAWG_KEY
            }
            })
            .then((response)=>{
            let searchedGame = response.data.results[0].name
            let searchedGameImg = response.data.results[0].background_image
            this.setState({
                searchResult: searchedGame,
                background_image: searchedGameImg 
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
    }

    gamePost = () => {
        let gameObject = {
            name: this.state.searchResult,
            image: this.state.background_image
        }
        api.addGame(gameObject)
        .then(res => (gameObject ))
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
            <Container fluid>
                <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Sandbox"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                />
                <Row>
                    <Col size = "md-12">
                    <Jumbotron> <h1>Saved Games Page</h1></Jumbotron>
                    </Col>
                </Row>
                <Container fluid>
                    <Row>
                        <Col size = "md-12">
                            <SearchForm
                            value = {this.state.search}
                            handleInputChange = {this.handleInputChange}
                            handleFormSubmit = {this.handleFormSubmit}
                            />
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <Col size = "md-5">
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
                    <Col size = "md-5">
                        {this.state.savedGames.length ? (
                            <Card>
                                {this.state.savedGames.map((savedGame) => (
                                    <ListItem key = {savedGame._id}>
                                        <Link to = {"/games/" + savedGame._id}/>
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
                                    </ListItem>
                                ))}
                                </Card>
                        ):(
                        <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
                
                {/* <Row>
                    <Col size = "md-12"> 
                    {this.state.savedGames.length > 0 ? (
                        <List>
                            {this.state.savedGames.map((game) => (
                                
                                <ListItem key = {game._id}>
                                    <Link to = { '/games/' + game._id}>
                                        <strong>
                                            Game: {game.name} 
                                        </strong>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row> */}
            </Container>
        )
    }
}

export default GamePage;
