import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/thomas.jpg";
import team2 from "assets/img/faces/profilePic1.jpg";
import team3 from "assets/img/faces/jose.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Thomas Hutcheson
                <br />
                <small className={classes.smallTitle}>UX/UI Design</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  As an aspiring web developer I enjoy the career I have now in SEO and can't wait to grab the future.
                  I love this project and everything it stands for. Solving a real world problem that I face myself & doing so
                  in a space that has such a big influence on my life.
                  <br></br>
                  <a href="https://www.linkedin.com/in/thomasjhutch/">LinkedIn</a>
                  <br></br>
                  <a href="https://github.com/ThomasJHutch">GitHub</a>
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Jacob Okony
                <br />
                <small className={classes.smallTitle}>Full Stack Development</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Full Stack Developer familiar with web application architecture and design.
                  Known as being thorough and concise.  Leveraging a background in
                  restaurant management to achieve project goals and build strong
                  relationships with clients and employees.
                <br></br>
                  <a href="https://www.linkedin.com/in/jacobokony/">LinkedIn</a>
                  <br></br>
                  <a href="https://github.com/jakeokony1024">GitHub</a>
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Jose Mancha
                <br />
                <small className={classes.smallTitle}>Backend Developer</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  An up and coming web developer who's willing to learn.
                  Background consists of an apartment maintenance technician and
                  a Bachelor's Degree in Computer Science.
                  <br></br>
                  <a href="https://www.linkedin.com/in/jose-mancha-96467b96">
                    LinkedIn
                  </a>
                  <br></br>
                  <a href="https://github.com/josemm83">GitHub</a>
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
