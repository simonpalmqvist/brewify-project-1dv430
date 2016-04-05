/**
 * @description Service to handle authorization logic on the client
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";

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