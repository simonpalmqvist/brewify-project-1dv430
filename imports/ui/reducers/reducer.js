/**
 * @description Main reducer to merge all reducers together
 * @author simonpalmqvist
 */

import { combineReducers } from "redux";

import flashMessages from "./flashMessages";
import { routerReducer } from "react-router-redux";

export default rootReducer = combineReducers({
    flashMessages,
    routing: routerReducer
});