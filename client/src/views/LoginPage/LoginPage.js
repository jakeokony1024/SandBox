// import React from "react";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// // core components
// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
// import Footer from "components/Footer/Footer.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardFooter from "components/Card/CardFooter.js";
// import CustomInput from "components/CustomInput/CustomInput.js";

// import styles from "assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";
// //Login Methods


// const useStyles = makeStyles(styles);

// export default function LoginPage(props) {
//   const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
//   setTimeout(function () {
//     setCardAnimation("");
//   }, 700);
//   const classes = useStyles();
//   const { ...rest } = props;
//   return (
//     <div>
//       <Header
//         absolute
//         color="transparent"
//         brand="SandBox"
//         rightLinks={<HeaderLinks />}
//         {...rest}
//       />
//       <div
//         className={classes.pageHeader}
//         style={{
//           backgroundImage: "url(" + image + ")",
//           backgroundSize: "cover",
//           backgroundPosition: "top center"
//         }}
//       >
//         <div className={classes.container}>
//           <GridContainer justify="center">
//             <GridItem xs={12} sm={12} md={4}>
//               <Card className={classes[cardAnimaton]}>
//                 <form className={classes.form}>
//                   <CardHeader color="primary" className={classes.cardHeader}>
//                     <h4>Login</h4>
//                     <div className={classes.socialLine}>
//                       <Button
//                         justIcon
//                         href="#pablo"
//                         target="_blank"
//                         color="transparent"
//                         onClick={e => e.preventDefault()}
//                       >
//                         <i className={"fab fa-twitter"} />
//                       </Button>
//                       <Button
//                         justIcon
//                         href="#pablo"
//                         target="_blank"
//                         color="transparent"
//                         onClick={e => e.preventDefault()}
//                       >
//                         <i className={"fab fa-facebook"} />
//                       </Button>
//                       <Button
//                         justIcon
//                         href="#pablo"
//                         target="_blank"
//                         color="transparent"
//                         onClick={e => e.preventDefault()}
//                       >
//                         <i className={"fab fa-google-plus-g"} />
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <p className={classes.divider}>Or Be Classical</p>
//                   <CardBody>
//                     <CustomInput
//                       labelText="First Name..."
//                       id="first"
//                       formControlProps={{
//                         fullWidth: true
//                       }}
//                       inputProps={{
//                         type: "text",
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <People className={classes.inputIconsColor} />
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                     <CustomInput
//                       labelText="Email..."
//                       id="email"
//                       formControlProps={{
//                         fullWidth: true
//                       }}
//                       inputProps={{
//                         type: "email",
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <Email className={classes.inputIconsColor} />
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                     <CustomInput
//                       labelText="Password"
//                       id="pass"
//                       formControlProps={{
//                         fullWidth: true
//                       }}
//                       inputProps={{
//                         type: "password",
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <Icon className={classes.inputIconsColor}>
//                             </Icon>
//                           </InputAdornment>
//                         ),
//                         autoComplete: "off"
//                       }}
//                     />
//                   </CardBody>
//                   <CardFooter className={classes.cardFooter}>
//                     <Button simple color="primary" size="lg">
//                       Login 
//                     </Button>
//                     <Button 
//                     simple color = "primary" 
//                     size = "lg"
//                     href = "/signUpPage"
//                     >
//                       New User? Sign Up Here!
//                     </Button>
//                   </CardFooter>
//                 </form>
//               </Card>
//             </GridItem>
//           </GridContainer>
//         </div>
//         <Footer whiteFont />
//       </div>
//     </div>
//   );
// }

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: `20px auto 20px auto`
  },
  pageTitle: {
    margin: `10px auto 10px auto`
  },
  textField: {
    margin: `10px auto 10px auto`
  },
  button:{
      marginTop: 20
  }
};
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        loading: true
    });
    const userData = {
        email: this.state.email,
        password: this.state.password
    }
    axios.post('/login', userData)
    .then((res) => {
        console.log(res.data);
        this.setState({
            loading: false
        });
        this.props.history.push('/');
    })
    .catch((err) => {
        this.setState({
            errors: err.response.data,
            loading: false
        });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.handleChange)
  };

  render() {
    const { classes } = this.props;
    const {errors} = this.state; 
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          {/* Logo input here */}
          {/* <img src{icon} alt="logo" className = {classes.image}/> */}
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
                Login
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(login);
