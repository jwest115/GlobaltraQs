import axios from "axios";
import {
    EDIT_PIN,
    EDIT_USER,
    GET_USER,
    GET_USERS,
    EDIT_USER_ROLE,
    SEARCH_USERS,
    GET_NEXT_PREVIOUS_USERS, GET_USER_FAVORITE_STORIES, GET_PINS
} from "./types";

import { DELETE_USER } from "./types";

export const searchUsers = username => dispatch => {
  axios
    .get(`/api/profile/users?search=${username}`)
    .then(res => {
      dispatch({
        type: SEARCH_USERS,
        payload: res.data
      });
      console.log("user search");
      console.log(res.data);
    })
    .catch(error => console.log(error.response.data));
};

export const getUsers = () => dispatch => {
  axios
    .get("/api/auth/users/")
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const editUser = (userId, editorId, user) => dispatch => {
  console.log(user);
  axios
    .patch(`/api/auth/users/${userId}/`, user)
    .then(res => {
      if (editorId == userId) {
        dispatch({
          type: EDIT_USER,
          payload: res.data
        });
      } else {
        dispatch({
          type: EDIT_USER,
          payload: null
        });
      }
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/auth/users/${id}/`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const getUser = id => dispatch => {
  axios
    .get(`/api/auth/users/${id}/`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(function (error) {
      console.log(error.response);
      dispatch({
        type: GET_USER,
        payload: null
      });
    });
};

export const editUserRole = (id, role) => dispatch => {
  axios
    .patch(`/api/auth/users/${id}/`, role)
    .then(res => {
      dispatch({
        type: EDIT_USER_ROLE,
        payload: res.data
      });
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

export const getNextPreviousUsers = link => dispatch => {
  axios
    .get(`${link}`)
    .then(res => {
      dispatch({
        type: GET_NEXT_PREVIOUS_USERS,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};

export const getFavoritePosts =  id => dispatch => {
    axios
        .get(`/api/upVoteStory/?upVoter=${id}&upvote=true`)
        .then(res => {
            console.log(res.data)
            let arrayOfIDs = []
            for (let i = 0; i < res.data.length; i++) {
                arrayOfIDs.push(res.data[i].pinId);
            }
            console.log(arrayOfIDs);
              axios
                .get("/api/pins/")
                .then(res2 => {
                    console.log(res2.data);
                    console.log("is res 2");
                   let favoritedPins = res2.data.filter(pin => arrayOfIDs.includes(pin.id));
                   console.log(favoritedPins);
                    dispatch({
                        type: GET_USER_FAVORITE_STORIES,
                        payload: favoritedPins
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(error => console.log(error));
}
