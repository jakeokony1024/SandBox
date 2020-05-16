import React, { Component } from 'react'
import api from "../../utils/api";
import {Container, Row, Col} from "../Grid";
import {List, ListItem} from "../List";
import { Link } from "react-router-dom";

export default class UserInfo extends Component {
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
    return (
      <div>
        <Container>
          <Row>
            <Col size = "md-12">
              {this.state.users.length ? (
                <List>
                {this.state.users.map((user) => (
                  <ListItem key={user._id}>
                  <Link to={"/profilePage"}> 
                      <strong>{"SandBox Username: " + user.handle}</strong>
                      <br/>
                      <strong>{"Main Console: " + user.mainPlatform} </strong>
                  </Link>
                  </ListItem>
                ))}
                </List>
              ) : (
                <h3>No Results </h3>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
