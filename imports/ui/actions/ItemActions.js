/**
 * @description Actions for items
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import Store from "../store";

/**
 * Action to add a new item
 * @param text
 */
export function addItem(text) {
    Store.dispatch(() => {
        Meteor.call("items.insert", text, () => incrementItem());
    });
}

/**
 * Function to dispatch added items action
 */
function incrementItem() {
    Store.dispatch({type: "ADDED_ITEMS"});
}