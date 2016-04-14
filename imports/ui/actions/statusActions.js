/**
 * @description Status actions for handling statuses as loading, errors and saved events
 * @author simonpalmqvist
 */

//Modules
import Store from "../store";

/**
 * Dispatches action error with specified error
 * @param error
 */
export function errorAction(error) {
    Store.dispatch({type: "ERROR", error});
}

/**
 * Dispatches action save to indicate that last call to the server saved the current progress
 */
export function saveAction() {
    Store.dispatch({type: "SAVE"});
}

/**
 * Dispatches action to show loader but only after one second
 */
export function startedLoading() {
    setTimeout(() => {
        Store.dispatch({type: "LOADING", status: true});
    }, 1000);
}

/**
 * Dispatches action to dismiss loader
 */
export function finishedLoading() {
    Store.dispatch({type: "LOADING", status: false});
}