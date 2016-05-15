/**
 * @description Authentication actions for handling authentication and authorization
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { browserHistory } from "react-router";
import Store from "../store";
import { errorAction, removeMessage, startedLoading, finishedLoading } from "./StatusActions";
import { subscribeAll } from "./SubscribeActions";
import { addBrewProfile } from "./BrewProfileActions";

/**
 * Redirect to dashboard for logged in users
 */
function redirect() {
    browserHistory.push("/dashboard");
}

/**
 * Login action
 * @param email
 * @param password
 */
export function loginUser(email, password) {
    startedLoading();
    Store.dispatch(() => {
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                finishedLoading();
                return errorAction(error);
            }

            subscribeAll();
            redirect();
            finishedLoading();
        });
    });
}

/**
 * Register action
 * @param email
 * @param password
 */
export function registerUser(email, password) {
    startedLoading();
    Store.dispatch(() => {
        Accounts.createUser({email, password}, (error) => {
            if (error) {
                finishedLoading();
                return errorAction(error);
            }
            //Subscribe to collections, add a brew profile and redirect to dashboard
            subscribeAll();
            addBrewProfile();
            redirect();
            finishedLoading();
        });
    });
}

/**
 * Logout action, when done redirect to start page
 */
export function logoutUser() {
    startedLoading();
    Store.dispatch(() => {
        Meteor.logout(() => {
            browserHistory.push("/");
            finishedLoading();
        });
    });
}

/**
 * Authorization method to redirect user if not logged in
 * @param nextState
 * @param transition
 */
export function alreadyLoggedIn(nextState, transition) {
    //If user already logged in redirect to dashboard
    if (Meteor.userId()) {
        transition("/dashboard");
    }
}

/**
 * Authorization method to redirect user if logged in
 * @param nextState
 * @param transition
 */
export function loggedIn(nextState, transition) {
    if (!Meteor.userId()) {
        return transition("/login");
    }
}
