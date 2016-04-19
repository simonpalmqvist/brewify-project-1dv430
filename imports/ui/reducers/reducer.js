/**
 * @description Main reducer to merge all reducers together
 * @author simonpalmqvist
 */

import { combineReducers } from "redux";

import flashMessages from "./flashMessages";
import loading from "./loading";
import subscriptions from "./subscriptions";
import browser from "./browser";
import { routerReducer } from "react-router-redux";

export default rootReducer = combineReducers({
    loading,
    flashMessages,
    subscriptions,
    browser,
    routing: routerReducer
});