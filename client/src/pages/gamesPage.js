import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Navbar"

class GameSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedGames: [{}],
        }
    }

    componentDidMount() {
        api.getUsers()
            .then(data => this.setState({ savedGames: data }))
            .catch (err => console.log(err))
    }
    render() {

        
        return (
            <Container fluid>
                <Jumbotron><Nav/></Jumbotron>
                <Row>
                    <Col size = "md-12">
                        {
                            this.state.savedGames ? (<h1>Data is loaded.</h1>) : (<h1>Loading Data...</h1>)
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GameSearch;
