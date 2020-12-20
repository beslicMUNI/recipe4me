import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Mui imports
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import MyButton from "../util/MyButton";
import DeleteRecipe from "../components/DeleteRecipe";
import RecipeDialog from "../components/RecipeDialog";

import { connect } from "react-redux";
import { likeRecipe, unlikeRecipe } from "../redux/actions/dataActions";
import PropTypes from "prop-types";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 20,
    objectFit: "cover",
  },
};

export class Recipe extends Component {
  likedRecipe = () => {
    console.log(this.props);
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.recipeId === this.props.recipe.recipeid
      )
    ) {
      return true;
    } else {
      console.log("vracam fels");
      return false;
    }
  };

  likeRecipe = () => {
    console.log(this.props.recipe);
    this.props.likeRecipe(this.props.recipe.recipeid);
  };

  unlikeRecipe = () => {
    this.props.unlikeRecipe(this.props.recipe.recipeid);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      recipe: {
        description,
        createdAt,
        userImage,
        byUser,
        recipeid,
        likeCount,
        commentCount,
        title,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedRecipe() ? (
      <MyButton tip="Undo like" onClick={this.unlikeRecipe}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeRecipe}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    const deleteButton =
      authenticated && byUser === handle ? (
        <DeleteRecipe recipeId={this.props.recipe.recipeid} />
      ) : (
        console.log("ahoj")
      );

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          ttile="profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          {deleteButton}
          <Typography
            variant="h5"
            component={Link}
            // to={`/users/${byUser}`}
            color="primary"
          >
            {title}
          </Typography>
          <Typography variant="body2">by {byUser}</Typography>

          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1"> {description}</Typography>

          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <RecipeDialog recipeId={this.props.recipe.recipeid} byUser={byUser} />
        </CardContent>
      </Card>
    );
  }
}

Recipe.propTypes = {
  likeRecipe: PropTypes.func.isRequired,
  unlikeRecipe: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  likeRecipe,
  unlikeRecipe,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Recipe));
