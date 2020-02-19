import axios from "axios";

import {
    GET_ABOUT_US,
    UPDATE_ABOUT_US
} from "./types";


export const updateAboutUs = (aboutUs) => dispatch => {
   axios.patch(`api/management/aboutUs/1/`, aboutUs)
    .then(res => {
      dispatch({
        type: UPDATE_ABOUT_US,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const getAboutUs = () => dispatch => {
   axios.get("api/management/aboutUs/1/")
    .then(res => {
      dispatch({
        type: GET_ABOUT_US,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

