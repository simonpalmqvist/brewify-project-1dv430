/**
 * @description Actions for items
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import Store from "../store";

export function addItem(text) {
    Store.dispatch(() => {
        Meteor.call("items.insert", text, () => incrementItem());
    });
}

function incrementItem() {
    Store.dispatch({type: "ADDED_ITEMS"});
}