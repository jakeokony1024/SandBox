import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Redirect } from "react-router-dom";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import form from "components/Form"
const dashboardRoutes = [];

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            mainPlatform: "",
            gamerTag: "",
            redirect: null
        }
    }
            handleInputChange = event => {
                let value = event.target.value;
                const name = event.target.name;
    
                if (name === "password" ) {
                    value = value.substring(0, 15);
                } 
                this.setState({
                    [name]: value
                });
            };

            handleFormSubmit = event => {
                event.preventDefault();
                if (!this.state.firstName || !this.state.lastName) {
                    alert("Please fill out your first and last name.")
                } else if (this.state.password.length < 10) {
                    alert(`Password must be 10 characters long ${this.state.firstName}`)
                } else {
                    alert(` Welcome to SandBox ${this.state.userName}!`)
                    this.apiCall();
                    this.setState({ redirect: "/ProfilePage"})
                }
            }

            apiCall = () => {
                let userObject = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.userName,
                password: this.state.password,
                mainPlatform: this.state.mainPlatform,
                gamerTag: this.state.gamerTag
            } 

                api.addUser(userObject) 
                .then(res =>  console.log(res))
                .catch((error) => console.log(error))
            }

    render() {
            if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
            }
        return (
            <div>
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
                    <Col size = "12">
                        <Jumbotron> <h1>Welcome to SandBox, </h1><h1> Create an Accout below!</h1></Jumbotron>
                    </Col>
                </Row>
                </Container>
                <Container>
                <Row>
                <form className="form">
                    <input
                        value={this.state.firstName}
                        name="firstName"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        value={this.state.lastName}
                        name="lastName"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Last Name"
                    />
                    <input
                        value={this.state.email}
                        name="email"
                        onChange={this.handleInputChange}
                        type="email"
                        placeholder="name@gmail.com"
                    />
                    <input
                        value={this.state.userName}
                        name="userName"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder=" New User Name"
                    />
                    <input
                        value={this.state.password}
                        name="password"
                        onChange={this.handleInputChange}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        value={this.state.mainPlatform}
                        name="mainPlatform"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder=" Preferred Game System"
                    />
                    <input
                        value={this.state.gamerTag}
                        name="gamerTag"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder=" Preferred Gamer Tag"
                    />
                    <button onClick={this.handleFormSubmit}>Submit</button>
                    </form>
                </Row>
                
            </Container>
            </div>
        )
    }
}

export default SignUpPage;