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
  EDIT_USER_ROLE
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  users: [],
  userProfile: null,
  story_author: null,
  registerFail: false,
  loginFail: false
};

export default function (state = initialState, action) {
  switch (action.type) {
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
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case EDIT_USER_ROLE:
      return {
        ...state,
        users: [
          ...state.users.filter(user => user.id !== action.payload.id),
          action.payload
        ]
      };
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
    default:
      return state;
  }
}
