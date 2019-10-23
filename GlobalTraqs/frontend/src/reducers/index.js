import { combineReducers } from "redux"
import pins from './pins'
import errors from "./errors";
import messages from "./messages";
import auth from "./auth"

export default combineReducers({
    pins,
    auth,
    errors,
    messages,

});