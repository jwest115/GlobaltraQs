import axios from "axios";

import {
    GET_PINS,
    DELETE_PINS,
    ADD_PIN,
    EDIT_PIN,
    GET_PIN,
    GET_USER, GET_PIN_BY_ID, GET_PINS_BY_OWNER
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

export const getPinsByOwner = ownerId => dispatch => {
    axios
    .get(`api/pins/?owner=${ownerId}`)
    .then(res => {
      dispatch({
        type: GET_PINS_BY_OWNER,
        payload: res.data
      });
      console.log(res.data);
      console.log("is owner's pin!");
    })
    .catch(error => console.log(error));
};