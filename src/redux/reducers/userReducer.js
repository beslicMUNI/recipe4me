import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_RECIPE:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            recipeId: action.payload.recipeId,
          },
        ],
      };
    case UNLIKE_RECIPE:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.recipeId !== action.payload.recipeId
        ),
      };

    default:
      return state;
  }
}
