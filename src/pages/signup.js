import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Logo from "../images/recipe4me-logo.png";
import { Link } from "react-router-dom";
// import themeFile from '../util/theme'

// MUI imports
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux imports
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signUpUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Card>
            <CardContent>
              <img src={Logo} alt="logo" className={classes.image} />
              <Typography variant="h2" className={classes.pageTitle}>
                Sign up
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm passowrd"
                  helperText={errors.password}
                  error={errors.confirmPassword ? true : false}
                  className={classes.textField}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  id="handle"
                  name="handle"
                  type="text"
                  label="Handle"
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  className={classes.textField}
                  value={this.state.handle}
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
                  Sign up
                  {loading && (
                    <CircularProgress size={25} className={classes.progress} />
                  )}
                </Button>
                <br />
                <small>
                  Already have an account? Login{" "}
                  <Link to="/login" className={classes.textLink}>
                    <strong>here</strong>
                  </Link>
                </small>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signUpUser,
};

export default connect(mapStateToProps, { signUpUser })(
  withStyles(styles)(signup)
);
