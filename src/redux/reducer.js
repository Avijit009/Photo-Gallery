import * as actionTypes from "./actionTypes";
// import { authLoading } from "./authActionCreators";

const INITIAL_STATE = {
  // store firebase token and user id
  token: null,
  userId: null, // null means user is not authenticated
  // for auth spinner
  authLoading: false,
  // for auth error
  authFailedMsg: null,

  //load
  categories: [],
  categoryLoading: true,
  categoryErr: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // categories
    case actionTypes.LOAD_CATEGORIES:
      let categories = [];
      for (let key in action.payload) {
        categories.push({
          ...action.payload[key],
          id: key, //Generate unique key
        });
      }

      return {
        ...state,
        categories: categories,
        categoryLoading: false,
      };

    case actionTypes.CATEGORIES_LOAD_FAILED:
      return {
        ...state,
        categoryErr: true,
        categoryLoading: false,
      };
    // Auth
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };

    case actionTypes.AUTH_SIGNOUT:
      return {
        ...state,
        token: null,
        userId: null,
        authFailedMsg: null,
      };

    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };

    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        authFailedMsg: action.payload,
      };

    default:
      return state;
  }
};
