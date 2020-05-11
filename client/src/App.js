// import React from 'react';
// // import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
// import "react-activity-feed/dist/index.css";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import gamesPage from "./pages/gamesPage";
// // import profilePage from "./pages/profilePage";
// import SignUpPage from "./pages/signUpPage";
// import LoginPage from "./views/LoginPage/LoginPage"
// import { Container, Row, Col } from './components/Grid';
// import ProfilePage from './pages/profilePage';
// import LandingPage from 'views/LandingPage/LandingPage';

// class App extends React.Component {
//   render() {
//     return(
//       <Container>
//       <Router>
//         <div>
//           <Route exact path = "/" component={LandingPage} />
//           <Route exact path = "/LoginPage" component={LoginPage} />
//           <Route exact path = "/profilePage" component={ProfilePage} />
//           <Route exact path = "/gamesPage" component={gamesPage} />
//           <Route exact path = "/signUpPage" component={SignUpPage}/>
      
//         <Row>
//           <Col size = "md-4">
//           {/* <StreamApp
//         apiKey= {process.env.REACT_APP_CHAT_KEY}
//         appId={process.env.REACT_APP_CHAT_ID}
//         token={process.env.REACT_APP_CHAT_TOKEN}
//       >
//         <NotificationDropdown notify />
//         <StatusUpdateForm
//           feedGroup="timeline"
//           userId="user-one" />
//         <FlatFeed
//           options={ {reactions: { recent: true } } }
//           notify
//           Activity={(props) =>
//               <Activity {...props}
//                 Footer={() => (
//                   <div style={ {padding: '8px 16px'} }>
//                     <LikeButton {...props} />
//                     <CommentField
//                       activity={props.activity}
//                       onAddReaction={props.onAddReaction} />
//                     <CommentList activityId={props.activity.id} />
//                   </div>
//                 )}
//               />
//             }
//           />
//       </StreamApp> */}
//           </Col>
//         </Row>
      
//       </div>
//       </Router>
//       </Container>
//     );
//   }
// }

// export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
// import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "views/LandingPage/LandingPage";
import ProfilePage from "views/ProfilePage/ProfilePage";
import gamesPage from "./pages/gamesPage";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
              <PrivateRoute exact path="/ProfilePage" component={ProfilePage} />
              <PrivateRoute exact path = "/gamesPage" component={gamesPage}/>
            </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}
export default App;