import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";

class GameSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedGames: [],
        }
    }

    componentDidMount() {
        api.getGameSearch()
            .then(data => this.setState({ savedGames: data }))
            .catch (err => console.log(err))
    }
    render() {

        console.log(this.state.savedGames);
        return (
            <Container>
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
