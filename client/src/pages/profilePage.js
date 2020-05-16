import React, { Component } from "react";
import api from "../utils/api";
import {Container, Row, Col} from "../components/Grid";
import Nav from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import {List, ListItem} from "../components/List";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

// import profile from "assets/img/faces/christian.jpg";
import background from "assets/img/profile-bg.jpg"

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            users: [],
            
        }
        const classes = useStyles();
        const { ...rest } = props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
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
        console.log(this.state.users)
        return (
            <div>
              <Header
                color="transparent"
                brand="Sandbox"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                  height: 200,
                  color: "white"
                }}
                {...rest}
              />
              <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
              <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                  <div className={classes.container}>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
                        <div className={classes.profile}>
                          <div>
                            <img src={background} alt="..." className={imageClasses} />
                          </div>
                          <div className={classes.name}>
                            <h3 className={classes.title}>James Bond</h3>
                            <h6>Xbox: BondJames</h6>
                            <h6>PSN: James007</h6>
                            <h6>Steam: James_Bondage</h6>
        
        
                          </div>
                        </div>
                      </GridItem>
                    </GridContainer>
                    <div className={classes.description}>
                      <p>
                        Personal info about the person goes here. This will be what we send
                        to 50 or 100 users so that they can get introduced to this new user.{" "}
                      </p>
                    </div>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                        <NavPills
                          alignCenter
                          color="danger"
                          tabs={[
                            {
                              tabButton: "Studio",
                              tabIcon: Camera,
                              tabContent: (
                                <GridContainer justify="center">
                                  <GridItem xs={12} sm={12} md={4}>
                                    <GamesList/>
                                  </GridItem>
                                </GridContainer>
                              )
                            },
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          );
    }
}

export default Profile
