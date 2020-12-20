import {
  SET_RECIPES,
  SET_RECIPE,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  LOADING_DATA,
  LOADING_USER,
  DELETE_RECIPE,
  POST_RECIPE,
} from "../types";

const initialState = {
  recipes: [],
  recipe: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case SET_RECIPE:
      console.log(state);
      return {
        ...state,
        recipe: action.payload,
        loading: false,
      };
    case LIKE_RECIPE:
    case UNLIKE_RECIPE:
      let index = state.recipes.findIndex(
        (recipe) => recipe.recipeId === action.payload.recipeId
      );
      state.recipes[index] = action.payload;
      return { ...state };
    case DELETE_RECIPE:
      index = state.recipes.findIndex(
        (recipe) => recipe.recipeId === action.payload.recipeId
      );
      state.recipes.splice(index, 1);
      return { ...state };
    case POST_RECIPE:
      return { ...state, recipes: [action.payload, ...state.recipes] };
    default:
      return state;
  }
}
