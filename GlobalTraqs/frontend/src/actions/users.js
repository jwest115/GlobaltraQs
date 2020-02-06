import axios from "axios";
import {EDIT_PIN, EDIT_USER, GET_USER, GET_USERS} from "./types";
import {DELETE_USER} from "./types";


export const getUsers = () => dispatch => {
    axios.get('/api/auth/users/')
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
  axios.patch(`/api/auth/users/${userId}/`, user)
    .then(res => {
        if(editorId == userId) {
             dispatch({
                type: EDIT_USER,
                payload: res.data
              });
        }
        else {
            dispatch({
                type: EDIT_USER,
                payload: null
              });
        }
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const deleteUser = (id) => dispatch => {
    axios.delete(`/api/auth/users/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_USER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const getUser = (id) => dispatch => {
    axios.get(`/api/auth/users/${id}/`)
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