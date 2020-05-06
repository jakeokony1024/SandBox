import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Container, Row, Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Navbar"
import {List, ListItem} from "../components/List";
import SearchForm from "../components/SearchForm";
import axios from "axios";


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
            this.setState({ 
                savedGames: response.data.results,
                name: response.data.results.name,
                background_image: response.data.results.background_image
            })
        })
        .catch (err => console.log(err))
    }

    handleInputChange = event => {
        this.setState({ search: event.target.value })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        axios(this.state.search, {
            "method":"GET",
            "url":"https://rawg-video-games-database.p.rapidapi.com/games?search=" + this.state.search,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key":"a319d638b0msh397c0e24b21a62fp1a2660jsnc7f7e0f81537"
            }
            })
            .then((response)=>{
            let searchedGame = [response.data.results[0].name]
            this.setState({searchResult: searchedGame})
            console.log(this.state.searchResult)
            })
            .catch((error)=>{
            console.log(error)
            })
    }

    handleButtonCLick = event => {
        event.preventDefault();
        let gameList = this.state.searchResult;
        console.log(gameList)
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size = "md-12">
                        <Nav/> 
                    </Col>
                </Row>
                <Row>
                    <Col size = "md-12">
                    <Jumbotron> <h1>Saved Games Page</h1></Jumbotron>
                    </Col>
                </Row>
                <Container fluid>
                    <Row>
                        <Col size = "md-12">
                            <SearchForm
                            handleInputChange = {this.handleInputChange}
                            handleFormSubmit = {this.handleFormSubmit}/>
                        </Col>
                    </Row>
                </Container>

                {/* <Container>
                    <Row>
                        <Col size = "md-12">
                        <ListItem>
                                <strong>
                                    Game: {this.state.searchResult}
                                </strong>
                                <Button onClick={this.handleButtonCLick}>Add Game</Button>
                            </ListItem>
                        </Col>
                    </Row>
                </Container> */}
                
                <Row>
                    <Col size = "md-12"> 
                    {this.state.savedGames.length ? (
                        <List>
                            <ListItem>
                                <strong>
                                    Game: {this.state.searchResult}
                                </strong>
                                <br></br>
                                <button onClick = {this.handleButtonCLick}>Save Game</button>
                            </ListItem>
                            {this.state.savedGames.map((game) => (
                                
                                <ListItem key = {game._id}>
                                    <Link to = { '/games/' + game._id}>
                                        <strong>
                                            Game: {game.name} 
                                        </strong>
                                        {/* <strong>
                                            Image: {game.background_image}
                                        </strong> */}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GamePage;
