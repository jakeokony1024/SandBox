import React, { Component } from "react";
import { Row, Col} from "../Grid";
import api from "../../utils/api";
import Card from "../Card/Card";
import DeleteBtn from "components/DeleteBtn";
import {Link} from "react-router-dom"

class GamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        search: "",
        savedGames: [],
        name: "",
        background_image: "",
        searchResult: []
    }
  }
  componentDidMount() {
    this.gameGet();
  }
  deleteGame = (id) => {
    api.deleteGame(id)
    .then((res) => this.gameGet())
    .catch((err) => console.log(err));
  }
  gameGet = () => {
    api.getGames()
    .then((res) =>
        this.setState({
            savedGames: res.data
        })
    )
    .catch((err) => console.log(err));
  }
  render() {
    return (
      <div> 
        <Row>
          <Col size = "md-12">
            {this.state.savedGames.length > 0 ? (
            <div>
              {this.state.savedGames.map((savedGame) => (
                <Card key = {savedGame._id}>
                  <Link to ={"/games/" + savedGame._id}>
                    <h5
                    color="transparent" 
                    style={{textAlign: "center"}}>
                    {savedGame.name}
                    </h5>
                    <img 
                      src = {savedGame.image}
                      alt=""
                      style={{
                        boxSizing: "border-box",
                        height: "100%",
                        width: "100%"
                      }}
                      />
                      </Link>
                    <DeleteBtn onClick={()=> this.deleteGame(savedGame._id)}/>
                  </Card>
                ))}
            </div>
          ):(
          <h3>No Results to Display</h3>
          )}
          </Col>
        </Row>
      </div>
    )
  };
};

export default GamesList;