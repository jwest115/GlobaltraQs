import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DELETE_USER,
  GET_USERS,
  GET_USER,
  EDIT_USER,
  EDIT_USER_ROLE,
  SEARCH_USERS,
  GET_NEXT_PREVIOUS_USERS,
  USER_SELF_DELETE,
  FLAG_COMMENT,
  REMOVE_FLAG_COMMENT, GET_USER_FAVORITE_STORIES
} from "../actions/types";
import {getPinsById} from "../actions/pins";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  users: [],
  userProfile: null,
  story_author: null,
  registerFail: false,
  loginFail: false,
  favoriteStories: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_USER:
      return {
        ...state,
        userProfile: action.payload
      };
    case EDIT_USER:
      if (action.payload == null) {
        return {
          ...state
        };
      } else {
        return {
          ...state,
          user: action.payload
        };
      }
    case DELETE_USER:
      const filterUsersdel = state.users.results.filter(
        a => a.id !== action.payload
      );
      const delUsers = {
        ...state.users,
        results: filterUsersdel
      };
      return {
        ...state,
        users: delUsers
      };
    case EDIT_USER_ROLE:
      const usersRole = [
        ...state.users.results.filter(p => p.id !== action.payload),
        action.payload
      ];
      const listUsers = {
        ...state.users,
        results: usersRole
      };
      return {
        ...state,
        users: listUsers
      };
    case GET_NEXT_PREVIOUS_USERS:
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        registerFail: false,
        loginFail: false
      };
    case USER_SELF_DELETE:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        registerFail: true,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        loginFail: true
      };
    case FLAG_COMMENT:
      const userFlagComment = {
        id: action.payload.id,
        comment: action.payload.comment
      };
      const userInfo = {
        ...state.user,
        flaggerComment: [...state.user.flaggerComment, userFlagComment]
      };
      return {
        ...state,
        user: userInfo
      };
    case REMOVE_FLAG_COMMENT:
      const removeFlagComment = {
        ...state.user,
        flaggerComment: [
          state.user.flaggerComment.filter(flag => flag.id !== action.payload)
        ]
      };
      return {
        ...state,
        user: removeFlagComment
      };
    case GET_USER_FAVORITE_STORIES:
      return {
        ...state,
        favoriteStories: action.payload
      };
    default:
      return state;
  }
}
