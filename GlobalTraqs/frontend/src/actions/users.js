import axios from "axios";
import {GET_USERS} from "./types";
<<<<<<< HEAD
import {GET_USER} from "./types";
=======
>>>>>>> sidebar-part2
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

export const deleteUser = (id) => dispatch => {
    axios.delete(`/api/auth/users/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_USER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
<<<<<<< HEAD
};

export const getUser = (id) => dispatch => {
    axios.get(`/api/auth/users/${id}/`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
=======
>>>>>>> sidebar-part2
};