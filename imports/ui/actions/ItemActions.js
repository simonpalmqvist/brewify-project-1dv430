/**
 * @description Actions for items
 * @author simonpalmqvist
 */

import Dispatcher from "../dispatcher";

export function addItem(text) {
    Dispatcher.dispatch({
        type: "ADD_ITEM",
        text
    });
}