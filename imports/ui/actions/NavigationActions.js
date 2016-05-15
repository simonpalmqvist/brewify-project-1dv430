/**
 * @description Navigation actions for handling specific navigation settings
 * @author simonpalmqvist
 */

//Modules
import Store from "../store";

/**
 * Dispatches action back url to set the url for back button
 * @param url
 * @param text
 */
export function showBackButton(url, text) {
    Store.dispatch({type: "BACK_BUTTON", url, text});
}

/**
 * Dispatches action to remove back url for back button
 */
export function removeBackButton() {
    Store.dispatch({type: "REMOVE_BACK_BUTTON"});
}
