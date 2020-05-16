import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../utils/api"
//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.spreadIt
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
      // localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`); //token initialized here
      this.setState({
        loading: false,
      });
      this.props.history.push("/login");
    })
    .catch((err) => {
      this.setState({
        errors: err.response.data,
        loading: false,
      });
    });
    api.addUser(newUserData) 
      .then(res =>  console.log(res))
      .catch((error) => console.log(error))
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
