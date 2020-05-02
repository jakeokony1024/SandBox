import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Nav from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import {List, ListItem} from "../components/List";
import { Link } from "react-router-dom";

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            users: [],
            
        }
    }
	componentDidMount() {
		this.loadUsers();
	}

	loadUsers = () => {
		api.getUsers()
			.then((res) =>
				this.setState({
                    users: res.data
				})
			)
			.catch((err) => console.log(err));
    }

    render() {
        console.log(this.state.users)
        return (
            <Container fluid>
                <Nav/>
                <Jumbotron> <h1>List of Users </h1> </Jumbotron>
                <Row>
                    <Col size = "md-0">
                        {this.state.users.length ? (
                            <List>
                                {this.state.users.map((user) => (
                                    <ListItem key={user._id}>
                                        <Link to={"/users/" + user._id}/> 
                                        <strong>{"SandBox Username: " + user.username}</strong>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <h3>No Results </h3>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Profile
