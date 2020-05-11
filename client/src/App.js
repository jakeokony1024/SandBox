import React from 'react';
// import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import "react-activity-feed/dist/index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import gamesPage from "./pages/gamesPage";
// import profilePage from "./pages/profilePage";
import SignUpPage from "./pages/signUpPage";
import login from "./pages/login"
import { Container, Row, Col } from './components/Grid';
import ProfilePage from 'views/ProfilePage/ProfilePage';
import LandingPage from 'views/LandingPage/LandingPage';
// import Footer from "./components/Footer"

class App extends React.Component {
  render() {
    return(
      <Container>
      <Router>
        <div>
          <Route exact path = "/" component={LandingPage} />
          <Route exact path = "/login" component={login} />
          <Route exact path = "/profilePage" component={ProfilePage} />
          <Route exact path = "/gamesPage" component={gamesPage} />
          <Route exact path = "/signUpPage" component={SignUpPage}/>
      
        <Row>
          <Col size = "md-4">
          </Col>
        </Row>
      
      </div>
      </Router>
      {/* <Footer/> */}
      </Container>
    );
  }
}

export default App;