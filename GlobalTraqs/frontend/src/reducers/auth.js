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
<<<<<<< HEAD
  GET_USERS,
  GET_USER
=======
  GET_USERS
>>>>>>> sidebar-part2
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
<<<<<<< HEAD
  user: '',
  users: [],
  story_author: null
=======
  user: null,
  users: []
>>>>>>> sidebar-part2
};

export default function(state = initialState, action) {
  switch (action.type) {
<<<<<<< HEAD
    case GET_USER:
        return {
          ...state,
          story_author: action.payload
    };
    case DELETE_USER:
      return {
          ...state,
          user: action.payload
=======
    case DELETE_USER:
      return {
          ...state,
          users: action.payload
>>>>>>> sidebar-part2
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
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}