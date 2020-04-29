import React from 'react'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Jumbotron from "./components/Jumbotron"
import gamesPage from "../src/pages/gamesPage"
// import profilePage from "../src/pages/profilePage"
import Nav from "./components/Navbar"

function App() {
  return(
    <Router>
      <div>
          <Route exact path = "/" component={gamesPage} />
          {/* <Route exact path = "/profile" component={profilePage} /> */}
      </div>
    </Router>
  );
};
export default App;