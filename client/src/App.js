import React from 'react'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import gamesPage from "./pages/gamesPage"
import profilePage from "./pages/profilePage"


function App() {
  return(
    <Router>
      <div>
          <Route exact path = "/" component={gamesPage} />
          <Route exact path = "/pages/profilePage" component={profilePage} />
          <Route exact path = "/pages/gamesPage" component={gamesPage} />

      </div>
    </Router>
  );
};
export default App;