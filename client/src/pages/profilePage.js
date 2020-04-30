import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Nav from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";

class Profile extends Component {
	state = {
        users: [],
	};

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
        return (
            <Container>
                <Jumbotron><Nav/>
                All Users</Jumbotron>
                <Row>
                    <Col size = "md-12">
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Profile
