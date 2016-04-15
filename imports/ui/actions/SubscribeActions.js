/**
 * @description Subscribe actions to subscribe to Meteor publications
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import Store from "../store";

/**
 * Subscribes to publication and stores it in state
 * @param publication
 */
export function subscribeAction(publication) {
    let subscription = Meteor.subscribe(publication);
    Store.dispatch({type: "SUBSCRIPTION", publication, subscription});
}