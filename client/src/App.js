import React from "react";
// import {
//   StreamApp,
//   NotificationDropdown,
//   FlatFeed,
//   LikeButton,
//   Activity,
//   CommentList,
//   CommentField,
//   StatusUpdateForm,
// } from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import gamesPage from "./pages/gamesPage";
import themeFile from "./utils/theme";
// import profilePage from "./pages/profilePage";
import signup from "./pages/signup";
import login from "./pages/login";
import AuthRoute from "./utils/AuthRoute";
import { Container, Row} from "./components/Grid";
import ProfilePage from "views/ProfilePage/ProfilePage";
import LandingPage from "views/LandingPage/LandingPage";
import jwtDecode from "jwt-decode";
import dashboard from "./pages/dashboard"
//MUI stuff
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken; //token is here
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Container>
          <Router>
            <Switch>
              <div>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={dashboard} />

                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/profilePage"
                  component={ProfilePage}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/gamesPage"
                  component={gamesPage}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
                <Row>
                  {/* <Col size="md-4">
                    <StreamApp
                      apiKey={process.env.REACT_APP_CHAT_KEY}
                      appId={process.env.REACT_APP_CHAT_ID}
                      token={process.env.REACT_APP_CHAT_TOKEN}
                    >
                      <NotificationDropdown notify />
                      <StatusUpdateForm
                        feedGroup="timeline"
                        userId="user-one" />
                      <FlatFeed
                        options={{ reactions: { recent: true } }}
                        notify
                        Activity={(props) =>
                          <Activity {...props}
                            Footer={() => (
                              <div style={{ padding: '8px 16px' }}>
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
                    </StreamApp>
                  </Col> */}
                </Row>
              </div>
            </Switch>
          </Router>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
