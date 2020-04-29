import React from 'react'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Jumbotron from "./components/Jumbotron"
import gamesPage from "../src/pages/gamesPage"
import Nav from "./components/Navbar"

function App() {
  return(
    <Router>
      <div>
      <Nav/>
        <Jumbotron/>
          <Route exact path = "/" component={gamesPage} />
      </div>
    </Router>
  );
};
export default App;