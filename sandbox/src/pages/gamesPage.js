import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Navbar from "../components/Navbar"

class GameSearch extends Component {
    state = {
        savedGames: []
    }

    componentDidMount() {
        api.getGameSearch()
            .then(res.this.setState({ savedGames: res.data }))
            .catch (err => console.log(err))
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col size = "md-12">
                        <Navbar/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GameSearch;
