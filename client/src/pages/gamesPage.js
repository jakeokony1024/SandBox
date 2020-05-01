import React, { Component } from "react";
// import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Navbar"
import axios from "axios";

class GameSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedGames: [{}]
        }
    }

    componentDidMount() {
        
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
                        this.setState({ savedGames: response.data.results})
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
            .catch (err => console.log(err))
    }



    render() {
        console.log(this.state.savedGames)
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
                
                <Row>
                    <Col size = "md-12">
                        {
                            this.state.savedGames.length > 0 ? (<h1>Data is loaded.</h1>) : (<h1>Loading Data...</h1>)
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GameSearch;
