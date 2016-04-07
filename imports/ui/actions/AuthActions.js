/**
 * @description Authentication actions that can be called
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { browserHistory } from "react-router";
import Store from "../store";

function redirect() {
    browserHistory.push("/dashboard");
}

function handleError(error) {
    Store.dispatch({type: "ERROR", error});
}

export function loginUser(email, password) {
    Store.dispatch(() => {
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                return handleError(error);
            }
            redirect();
        });
    });
}

export function registerUser(email, password) {
    Store.dispatch(() => {
        Accounts.createUser({email, password}, (error) => {
            if (error) {
                return handleError(error);
            }
            redirect();
        });
    });
}

export function logoutUser() {
    Store.dispatch(() => {
        Meteor.logout(() => browserHistory.push("/"));
    });
}

export function alreadyLoggedIn(nextState, transition) {
    //If user already logged in redirect to dashboard
    if (Meteor.userId()) {
        transition("/dashboard");
    }
}

export function loggedIn(nextState, transition) {
    if (!Meteor.userId()) {
        transition("/login");
    }
}