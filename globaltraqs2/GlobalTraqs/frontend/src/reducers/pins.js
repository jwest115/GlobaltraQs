import { GET_PINS, DELETE_PINS, ADD_PIN } from '../actions/types.js';

const initialState = {
    pins: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PINS:
            return {
                ...state,
                pins: action.payload
            }
        case DELETE_PINS:
            return {
                ...state,
                pins: state.pins.filter(pins => pins.id !== action.payload)
            }
        case ADD_PIN:
            return {
                ...state,
                pins: [...state.pins, action.payload]
            }
        default:
            return state;
    }
}