/**
 * @description Main reducer to merge all reducers together
 * @author simonpalmqvist
 */

import { combineReducers } from "redux";

import error from "./error";
import { routerReducer } from "react-router-redux";

export default rootReducer = combineReducers({
    error,
    routing: routerReducer
});