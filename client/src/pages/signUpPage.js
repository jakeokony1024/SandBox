// import React, { Component } from "react";
// import api from "../utils/api";
// import {Container, Row, Col} from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
// import { Redirect } from "react-router-dom";
// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
// import form from "components/Form"
// const dashboardRoutes = [];

// class SignUpPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
            
//             firstName: "",
//             lastName: "",
//             email: "",
//             userName: "",
//             password: "",
//             mainPlatform: "",
//             gamerTag: "",
//             redirect: null
//         }
//     }
//             handleInputChange = event => {
//                 let value = event.target.value;
//                 const name = event.target.name;
    
//                 if (name === "password" ) {
//                     value = value.substring(0, 15);
//                 } 
//                 this.setState({
//                     [name]: value
//                 });
//             };

//             handleFormSubmit = event => {
//                 event.preventDefault();
//                 if (!this.state.firstName || !this.state.lastName) {
//                     alert("Please fill out your first and last name.")
//                 } else if (this.state.password.length < 10) {
//                     alert(`Password must be 10 characters long ${this.state.firstName}`)
//                 } else {
//                     alert(` Welcome to SandBox ${this.state.userName}!`)
//                     this.apiCall();
//                     this.setState({ redirect: "/ProfilePage"})
//                 }
//             }

//             apiCall = () => {
//                 let userObject = {
//                 firstName: this.state.firstName,
//                 lastName: this.state.lastName,
//                 email: this.state.email,
//                 username: this.state.userName,
//                 password: this.state.password,
//                 mainPlatform: this.state.mainPlatform,
//                 gamerTag: this.state.gamerTag
//             } 

//                 api.addUser(userObject) 
//                 .then(res =>  console.log(res))
//                 .catch((error) => console.log(error))
//             }

//     render() {
//             if (this.state.redirect) {
//             return <Redirect to={this.state.redirect} />
//             }
//         return (
//             <div>
//                 <Container fluid>
//                 <Header
//                 color="transparent"
//                 routes={dashboardRoutes}
//                 brand="Sandbox"
//                 rightLinks={<HeaderLinks />}
//                 fixed
//                 changeColorOnScroll={{
//                 height: 400,
//                 color: "white"
//                 }}
//                 />
//                 <Row>
//                     <Col size = "12">
//                         <Jumbotron> <h1>Welcome to SandBox, </h1><h1> Create an Accout below!</h1></Jumbotron>
//                     </Col>
//                 </Row>
//                 </Container>
//                 <Container>
//                 <Row>
//                 <form className="form">
//                     <input
//                         value={this.state.firstName}
//                         name="firstName"
//                         onChange={this.handleInputChange}
//                         type="text"
//                         placeholder="First Name"
//                     />
//                     <input
//                         value={this.state.lastName}
//                         name="lastName"
//                         onChange={this.handleInputChange}
//                         type="text"
//                         placeholder="Last Name"
//                     />
//                     <input
//                         value={this.state.email}
//                         name="email"
//                         onChange={this.handleInputChange}
//                         type="email"
//                         placeholder="name@gmail.com"
//                     />
//                     <input
//                         value={this.state.userName}
//                         name="userName"
//                         onChange={this.handleInputChange}
//                         type="text"
//                         placeholder=" New User Name"
//                     />
//                     <input
//                         value={this.state.password}
//                         name="password"
//                         onChange={this.handleInputChange}
//                         type="password"
//                         placeholder="Password"
//                     />
//                     <input
//                         value={this.state.mainPlatform}
//                         name="mainPlatform"
//                         onChange={this.handleInputChange}
//                         type="text"
//                         placeholder=" Preferred Game System"
//                     />
//                     <input
//                         value={this.state.gamerTag}
//                         name="gamerTag"
//                         onChange={this.handleInputChange}
//                         type="text"
//                         placeholder=" Preferred Gamer Tag"
//                     />
//                     <button onClick={this.handleFormSubmit}>Submit</button>
//                     </form>
//                 </Row>
                
//             </Container>
//             </div>
//         )
//     }
// }

// export default SignUpPage;

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
    ...theme,
    });

    class signup extends Component {
    constructor() {
        super();
        this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mainPlatform: "",
        handle: "",
        gamerTag: "",
        loading: false,
        errors: {},
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
        loading: true,
        });
        const newUserData = { 
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        handle: this.state.handle,
        mainPlatform: this.state.mainPlatform,
        gamerTag: this.state.gamerTag,
        };
        axios
        .post("/signup", newUserData)
        .then((res) => {
            console.log(res.data);
            localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`); //token initialized here
            this.setState({
            loading: false,
            });
            this.props.history.push("/");
        })
        .catch((err) => {
            this.setState({
            errors: err.response.data,
            loading: false,
            });
        });
    };

    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
            {/* Logo input here */}
            {/* <img src{icon} alt="logo" className = {classes.image}/> */}
            <Typography variant="h2" className={classes.pageTitle}>
                Signup
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                id="firstName"
                name="firstName"
                type="text"
                label="FirstName"
                className={classes.textField}
                helperText={errors.firstName}
                error={errors.firstName ? true : false}
                value={this.state.firstName}
                onChange={this.handleChange}
                fullWidth
                />
                <TextField
                id="lastName"
                name="lastName"
                type="text"
                label="LastName"
                className={classes.textField}
                helperText={errors.lastName}
                error={errors.lastName ? true : false}
                value={this.state.lastName}
                onChange={this.handleChange}
                fullWidth
                />
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
                <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="ConfirmPassword"
                className={classes.textField}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
                />
                <TextField
                id="handle"
                name="handle"
                type="text"
                label="Handle"
                className={classes.textField}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                value={this.state.handle}
                onChange={this.handleChange}
                fullWidth
                />
                <TextField
                id="mainPlatform"
                name="mainPlatform"
                type="text"
                label="MainPlatform"
                className={classes.textField}
                helperText={errors.mainPlatform}
                error={errors.mainPlatform ? true : false}
                value={this.state.mainPlatform}
                onChange={this.handleChange}
                fullWidth
                />
                <TextField
                id="gamerTag`"
                name="gamerTag"
                type="text"
                label="gamerTag"
                className={classes.textField}
                helperText={errors.gamerTag}
                error={errors.gamerTag ? true : false}
                value={this.state.gamerTag}
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
                disabled={loading}
                >
                Signup!
                {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                )}
                </Button>
                <br />
                <small>
                Already have an account? Login <Link to="/login">here!</Link>
                </small>
            </form>
            </Grid>
            <Grid item sm />
        </Grid>
        );
    }
    }

    signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(signup);