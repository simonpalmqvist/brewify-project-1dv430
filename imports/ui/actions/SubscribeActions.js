/**
 * @description Subscribe actions to subscribe to Meteor publications
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import Store from "../store";

export function subscribeAll() {
    if (Meteor.userId() && !Store.getState().subscriptions.subscribed) {
        //Subscribe to the data sources

        [
            "recipes",
            "brew.profiles",
            "recipes.fermentables",
            "recipes.hops",
            "recipes.yeasts",
            "recipes.ingredients",
            "fermentables",
            "hops",
            "yeasts",
            "ingredients"
        ].forEach(subscribeAction);
    }
}

/**
 * Subscribes to publication and stores it in state
 * @param publication
 */
export function subscribeAction(publication) {
    let subscription = Meteor.subscribe(publication);
    Store.dispatch({type: "SUBSCRIPTION", publication, subscription});
}