/**
 * @description Navigation actions for handling specific navigation settings
 * @author simonpalmqvist
 */

//Modules
import Store from "../store";

/**
 * Dispatches action back url to set the url for back button
 * @param url
 */
export function showBackButton(url) {
    Store.dispatch({type: "BACK_URL", url});
}

/**
 * Dispatches action to remove back url for back button
 */
export function removeBackButton() {
    Store.dispatch({type: "REMOVE_BACK_URL"});
}
