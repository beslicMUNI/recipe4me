import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import UnfroldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";

import { getRecipe } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
});

class RecipeDialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.props.getRecipe(this.props.recipeId);
    this.setState({ open: true, loading: false });
    // this.state.open = true;
    // this.setState({ open: true });
    console.log(this.state);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      recipe: {
        recipeId,
        description,
        title,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        byUser,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={6} />
    ) : (
      <Grid container spacing={6}>
        <Grid item sm={5}>
          <img src={userImage} alt="image" className={classes.profileImage} />
        </Grid>

        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${byUser}`}
          >
            {byUser}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(this.props.recipe.createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">
            {this.props.recipe.description}
          </Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand recipe"
          tipClassName={classes.expandButton}
        >
          <UnfroldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle></DialogTitle>
          <DialogContent className={classes.dialogContent}>//</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

RecipeDialog.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipeId: PropTypes.string.isRequired,
  byUser: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.data.recipe,
  UI: state.UI,
});
const mapActionsToProps = {
  getRecipe,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(RecipeDialog));
