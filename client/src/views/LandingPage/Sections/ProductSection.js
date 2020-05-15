import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Sandbox</h2>
          <h5 className={classes.description}>
            For Gamers by gamers,
            SandBox will be able to send out your profile to players who share your gaming interest.
            Bypassing the hardest thing to do on the internet. - Finding a way to make friends.
            From there you will be able to chat and add more friends. Share experiences through gaming. Join game forums.
            post and make comments and meet even more people. - With SandBox, the opportunities really are endless; you
            have the greatest ice breaker of all...gaming.

          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="Free Chat"
              description="Chat. Post. Comment. Share. Live. Our always on chat function means you can instantly message your new friends. Even during the most intense gaming session"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="Verified Users"
              description="Coming soon, users will be able to login with their google, facebook, Xbox, PSN, or Steam account. 
              Meaning added security and verified users. You can tell instantly who has more than one account attached by the green verified logo next to their account."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Fingerprint"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem> */}
        </GridContainer>
      </div>
    </div>
  );
}
