import axios from 'axios'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR
} from './types'

// CHECK TOKEN & load user
export const loadUser = () => (dispatch, getState) => {
    //UserLoading
    dispatch({ type: USER_LOADING });

    //GET token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //if token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token {token}`
    }
    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => console.log(err.response.data + '' + err.response.status));
}