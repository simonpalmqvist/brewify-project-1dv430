/**
 * @description Authentication actions for handling authentication and authorization
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { browserHistory } from "react-router";
import Store from "../store";
import { errorAction } from "./StatusActions";
import { subscribeAction } from "./SubscribeActions";
import { addBrewProfile } from "./BrewProfileActions";

/**
 * Redirect to dashboard for logged in users
 */
function redirect() {
    browserHistory.push("/dashboard");
}

export function subscribe() {
    if (Meteor.userId() && !Store.getState().subscriptions.subscribed) {
        //Subscribe to the data sources
        subscribeAction("recipes");
        subscribeAction("brew.profiles");
        subscribeAction("recipes.fermentables");
        subscribeAction("recipes.hops");
        subscribeAction("recipes.yeats");
        subscribeAction("fermentables");
        subscribeAction("hops");
        subscribeAction("yeasts");
    }
}

/**
 * Login action
 * @param email
 * @param password
 */
export function loginUser(email, password) {
    Store.dispatch(() => {
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                return errorAction(error);
            }
            subscribe();
            redirect();
        });
    });
}

/**
 * Register action
 * @param email
 * @param password
 */
export function registerUser(email, password) {
    Store.dispatch(() => {
        Accounts.createUser({email, password}, (error) => {
            if (error) {
                return errorAction(error);
            }
            //Subscribe to collections, add a brew profile and redirect to dashboard
            subscribe();
            addBrewProfile();
            redirect();
        });
    });
}

/**
 * Logout action, when done redirect to start page
 */
export function logoutUser() {
    Store.dispatch(() => {
        Meteor.logout(() => browserHistory.push("/"));
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
