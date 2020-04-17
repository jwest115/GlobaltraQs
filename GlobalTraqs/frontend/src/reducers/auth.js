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
  REMOVE_FLAG_COMMENT,
  GET_USER_FAVORITE_STORIES,
  UPDATE_PROFILE_PIC,
  EDIT_PIN_PRO,
  USER_PROFILE_LOADING,
  USER_PROFILE_NOT_FOUND,
  EDIT_PIN,
} from "../actions/types";
import { getPinsById } from "../actions/pins";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  isProfileLoading: false,
  user: "",
  users: [],
  userProfile: null,
  story_author: null,
  registerFail: false,
  loginFail: false,
  favoriteStories: [],
  profileStatus: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        userProfile: action.payload,
        isProfileLoading: false,
      };
    case EDIT_PIN:
      const updatedPin = state.userProfile.userStories.map((s) =>
        s.id === action.payload.id
          ? {
              ...s,
              title: action.payload.title,
              description: action.payload.description,
              category: action.payload.category,
              startDate: action.payload.startDate,
              endDate: action.payload.endDate,
            }
          : s
      );
      const userStoriesUpdatedProfile = {
        ...state.userProfile,
        userStories: updatedPin,
      };
      return {
        ...state,
        userProfile: userStoriesUpdatedProfile,
      };
    case USER_PROFILE_NOT_FOUND:
      return {
        ...state,
        isProfileLoading: false,
        profileStatus: action.payload,
      };
    case USER_PROFILE_LOADING:
      return {
        ...state,
        userProfile: null,
        isProfileLoading: true,
        profileStatus: false,
      };
    case EDIT_PIN_PRO:
      const updated = state.userProfile.userStories.map((s) =>
        s.id === action.payload.id
          ? {
              ...s,
              is_anonymous_pin: action.payload.is_anonymous_pin,
            }
          : s
      );
      const userPro = {
        ...state.userProfile,
        userStories: updated,
      };

      return {
        ...state,
        userProfile: userPro,
      };
    case EDIT_USER:
      if (action.payload == null) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          user: action.payload,
        };
      }
    case DELETE_USER:
      const filterUsersdel = state.users.results.filter(
        (a) => a.id !== action.payload
      );
      const delUsers = {
        ...state.users,
        results: filterUsersdel,
      };
      return {
        ...state,
        users: delUsers,
      };
    case EDIT_USER_ROLE:
      const usersRole = [
        ...state.users.results.filter((p) => p.id !== action.payload),
        action.payload,
      ];
      const listUsers = {
        ...state.users,
        results: usersRole,
      };
      return {
        ...state,
        users: listUsers,
      };
    case GET_NEXT_PREVIOUS_USERS:
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
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
        loginFail: false,
      };
    case USER_SELF_DELETE:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        loginFail: true,
        registerFail: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      console.log("setting register fail to true");
      return {
        ...state,
        registerFail: true,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        loginFail: true,
      };
    case FLAG_COMMENT:
      const userFlagComment = {
        id: action.payload.id,
        comment: action.payload.comment,
      };
      const userInfo = {
        ...state.user,
        flaggerComment: [...state.user.flaggerComment, userFlagComment],
      };
      return {
        ...state,
        user: userInfo,
      };
    case REMOVE_FLAG_COMMENT:
      const removeFlagComment = {
        ...state.user,
        flaggerComment: [
          state.user.flaggerComment.filter(
            (flag) => flag.id !== action.payload
          ),
        ],
      };
      return {
        ...state,
        user: removeFlagComment,
      };
    case GET_USER_FAVORITE_STORIES:
      return {
        ...state,
        favoriteStories: action.payload,
      };
    // case USER_PROFILE_LOADING:
    //   return {
    //     ...state,
    //     isProfileLoading: true,
    //   };
    case UPDATE_PROFILE_PIC:
      const profilepic = {
        ...state.user,
        profileurl: action.payload.profileurl,
      };

      return {
        ...state,
        user: profilepic,
        userProfile: profilepic,
      };
    default:
      return state;
  }
}
