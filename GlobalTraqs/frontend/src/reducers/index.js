import { combineReducers } from "redux"
import pins from './pins'
import auth from "./auth"

export default combineReducers({
    pins,
    auth,

});