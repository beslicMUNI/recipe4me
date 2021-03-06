import {
  SET_RECIPES,
  LOADING_DATA,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  DELETE_RECIPE,
  CLEAR_ERRORS,
  POST_RECIPE,
  LOADING_UI,
  SET_ERRORS,
  SET_RECIPE,
  STOP_LOADING_UI,
} from "../types";
import axios from "axios";

// get all recipes
export const getRecipes = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/recipes")
    .then((res) => {
      dispatch({
        type: SET_RECIPES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_RECIPES,
        payload: {},
      });
    });
};

// get a single recipe
export const getRecipe = (recipeId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/recipe/${recipeId}`)
    .then((res) => {
      dispatch({
        type: SET_RECIPE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

//post a recipe
export const postRecipe = (newRecipe) => (dispatch) => {
  console.log(newRecipe);
  dispatch({ type: LOADING_UI });
  axios
    .post("/recipe", newRecipe)
    .then((res) => {
      dispatch({
        type: POST_RECIPE,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a recipe
export const likeRecipe = (recipeId) => (dispatch) => {
  axios
    .get(`recipe/${recipeId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Unlike a scream
export const unlikeRecipe = (recipeId) => (dispatch) => {
  axios
    .get(`recipe/${recipeId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteRecipe = (recipeId) => (dispatch) => {
  axios
    .delete(`recipe/${recipeId}`)
    .then(() => {
      dispatch({ type: DELETE_RECIPE, payload: recipeId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
