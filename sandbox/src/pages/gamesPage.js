import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Nav from "../components/Navbar"

class GameSearch extends Component {
    state = {
        savedGames: []
    }

    componentDidMount() {
        api.getGameSearch()
            .then(this.setState({ savedGames: this.data }))
            .catch (err => console.log(err))
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col size = "md-12">
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GameSearch;
