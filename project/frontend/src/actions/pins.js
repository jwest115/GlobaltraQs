import axios from 'axios';

import { GET_PINS, DELETE_PINS, ADD_PIN } from './types';

//GET PINS
export const getPins = () => dispatch => {
    axios.get('/api/pins/')
        .then(res => {
            dispatch({
                type: GET_PINS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const deletePins = (id) => dispatch => {
    axios.delete(`/api/pins/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_PINS,
                payload: id
            });
        })
        .catch(err => console.log(err));
};

export const addPin = (pin) => dispatch => {
    console.log("here in add pin");
    axios.post('/api/pins/', pin)
        .then(res => {
            dispatch({
                type: ADD_PIN,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};