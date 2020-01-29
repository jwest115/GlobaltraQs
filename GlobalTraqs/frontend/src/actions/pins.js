import axios from "axios";

import {
  GET_PINS,
  DELETE_PINS,
  ADD_PIN,
  EDIT_PIN,
  GET_PIN,
  GET_USER,
  SEARCH_PINS,
  GET_UPVOTE,
  ADD_COMMENT,
  DELETE_COMMENT
} from "./types";

//GET PINS
export const getPins = () => dispatch => {
  axios
    .get("/api/pins/")
    .then(res => {
      dispatch({
        type: GET_PINS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const searchPins = (searchQuery, category) => dispatch => {
  axios
    .get(`api/pinSearch?search=${searchQuery}&category=${category}`)
    .then(res => {
      dispatch({
        type: SEARCH_PINS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deletePins = id => dispatch => {
  axios
    .delete(`/api/pins/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_PINS,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const addPin = pin => dispatch => {
  axios
    .post("/api/pins/", pin)
    .then(res => {
      dispatch({
        type: ADD_PIN,
        payload: res.data
      });
      console.log("In add pin");
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const editPin = (pin, id) => dispatch => {
  console.log(id + " " + pin.title);
  axios
    .patch(`/api/pins/${id}/`, pin)
    .then(res => {
      dispatch({
        type: EDIT_PIN,
        payload: res.data
      });
      console.log("In edit pin");
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const getPin = id => dispatch => {
  axios
    .get(`api/pins/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PIN,
        payload: res.data
      });
      console.log(res.data);
      console.log("is the pin!");
    })
    .catch(error => console.log(error));
};

export const getUpvote = (pinId, userid) => {
  axios
    .get(`api/upVoteStory?pinId=${pinId}&userid=${userid}`)
    .then(res => {
      dispatch({
        type: GET_UPVOTE,
        payload: res.data
      });
    })
    .catch(error => console.log(error));
};
export const addComment = comment => dispatch => {
  axios
    .post("api/commentStory/", comment)
    .then(res => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });

      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const deleteComment = id => dispatch => {
  axios
    .delete(`api/commentStory/${id}/`)
    .then(res => {
      dispatch({
        type: DELETE_COMMENT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};
