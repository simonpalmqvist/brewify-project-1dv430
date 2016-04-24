/**
 * @description Application client store to keep track of state
 * @author simonpalmqvist
 */

import { applyMiddleware, createStore } from "redux";
import createLogger from "redux-logger";
import ReduxThunk from "redux-thunk";

import reducer from "../reducers/reducer";

//Use Thunk to be able to dispatch async functions
const middleware = [ReduxThunk];

if (Meteor.isDevelopment && !Meteor.isTest) {
    middleware.push(createLogger());
}

//Create store with the root reducer and apply middleware
export default Store = createStore(reducer, {}, applyMiddleware(...middleware));