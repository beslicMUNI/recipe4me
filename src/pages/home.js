import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Recipe from "../components/Recipe";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getRecipes } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export class home extends Component {
  state = {
    recipes: null,
  };

  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const { recipes, loading } = this.props.data;
    let recentRecipesMarkup = !loading ? (
      recipes.map((recipe) => <Recipe key={recipe.recipeid} recipe={recipe} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <Typography variant="h3">The latest recipes</Typography>
          {recentRecipesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getRecipes })(home);
