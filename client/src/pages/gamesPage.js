import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {Container, Row, Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
// import {List, ListItem} from "../components/List";
import SearchForm from "../components/SearchForm";
import axios from "axios";
import Button from "components/CustomButtons/Button.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "../components/Card/Card";
// import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import { height, width } from "@material-ui/system";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

const dashboardRoutes = [];

// const useStyles = makeStyles(styles);

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

    // componentDidMount() {
    //     return axios({
    //     "method":"GET",
    //     "url":"https://rawg-video-games-database.p.rapidapi.com/games",
    //     "headers":{
    //     "content-type":"application/octet-stream",
    //     "x-rapidapi-host":"rawg-video-games-database.p.rapidapi.com",
    //     "x-rapidapi-key":process.env.REACT_APP_RAWG_KEY
    //     }
    //     })
    //     .then((response)=>{
    //         this.setState({ 
    //             savedGames: response.data.results,
    //             name: response.data.results.name,
    //             background_image: response.data.results.background_image
    //         })
    //     })
    //     .catch (err => console.log(err))
    // }

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
        let gameList = this.state.searchResult;
        console.log(gameList, this.state.background_image)
    }
    render(props) {
        // const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
        // setTimeout(function () {
        //     setCardAnimation("");
        // }, 700);
        // const classes = useStyles();
        // const { ...rest } = props;
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
                            handleInputChange = {this.handleInputChange}
                            handleFormSubmit = {this.handleFormSubmit}/>
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <Col size = "md-5">
                    <Card>
                        <CardHeader color="transparent" >
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
