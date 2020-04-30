import React from 'react'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import gamesPage from "../src/pages/gamesPage"
import profilePage from "../src/pages/profilePage"


function App() {
  return(
    <Router>
      <div>
          <Route exact path = "/" component={gamesPage} />
          <Route exact path = "/pages/profilePage" component={profilePage} />
          {/* <Route exact path = "/pages/profile" component={profilePage} /> */}

      </div>
    </Router>
  );
};
export default App;