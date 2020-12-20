import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "../images/recipe4me-logo.png";

import MyButton from "../util/MyButton";
import PostRecipe from "./PostRecipe";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    console.log(authenticated);
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <div class="logo-wrapper">
            <img src={Logo} alt="recipe4me" class="img-logo" />
          </div>
          {authenticated ? (
            <Fragment>
              <PostRecipe />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon color="primary" />
                </MyButton>
              </Link>
              <MyButton tip="notifications">
                <Notifications color="primary" />
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign UP
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
