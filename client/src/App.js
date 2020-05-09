import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import "react-activity-feed/dist/index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import gamesPage from "./pages/gamesPage";
// import profilePage from "./pages/profilePage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./views/LoginPage/LoginPage"
import { Container, Row, Col } from './components/Grid';
import ProfilePage from 'views/ProfilePage/ProfilePage';
import LandingPage from 'views/LandingPage/LandingPage';

class App extends React.Component {
  render() {
    return(
      <Container>
      <Router>
        <div>
          <Route exact path = "/" component={LandingPage} />
          <Route exact path = "/LoginPage" component={LoginPage} />
          <Route exact path = "/profilePage" component={ProfilePage} />
          <Route exact path = "/gamesPage" component={gamesPage} />
          <Route exact path = "/signUpPage" component={SignUpPage}/>
      
        <Row>
          <Col size = "md-4">
          {/* <StreamApp
        apiKey= {process.env.REACT_APP_CHAT_KEY}
        appId={process.env.REACT_APP_CHAT_ID}
        token={process.env.REACT_APP_CHAT_TOKEN}
      >
        <NotificationDropdown notify />
        <StatusUpdateForm
          feedGroup="timeline"
          userId="user-one" />
        <FlatFeed
          options={ {reactions: { recent: true } } }
          notify
          Activity={(props) =>
              <Activity {...props}
                Footer={() => (
                  <div style={ {padding: '8px 16px'} }>
                    <LikeButton {...props} />
                    <CommentField
                      activity={props.activity}
                      onAddReaction={props.onAddReaction} />
                    <CommentList activityId={props.activity.id} />
                  </div>
                )}
              />
            }
          />
      </StreamApp> */}
          </Col>
        </Row>
      
      </div>
      </Router>
      </Container>
    );
  }
}

export default App;