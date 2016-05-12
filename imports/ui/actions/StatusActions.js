/**
 * @description Status actions for handling statuses as loading, errors and saved events
 * @author simonpalmqvist
 */

//Modules
import Store from "../store";

let timeOut;

/**
 * Dispatches action error with specified error
 * @param error
 */
export function errorAction(error) {
    Store.dispatch({type: "ERROR_MESSAGE", error});
}

/**
 * Dispatches action save to indicate that last call to the server saved the current progress
 */
export function saveAction() {
    Store.dispatch({type: "SAVE_MESSAGE"});
}

/**
 * Dispatches action saving to indicate that data is currently being saved
 */
export function savingAction() {
    Store.dispatch({type: "SAVING_MESSAGE"});
}

/**
 * Dispatches action remove message to hide any messages showed
 */
export function removeMessage() {
    Store.dispatch({type: "REMOVE_MESSAGE"});
}

/**
 * Dispatches action to show loader but only after one second
 */
export function startedLoading() {
    timeOut = setTimeout(() => {
        Store.dispatch({type: "LOADING", status: true});
    }, 100);
}

/**
 * Dispatches action to dismiss loader
 */
export function finishedLoading() {
    clearTimeout(timeOut);
    Store.dispatch({type: "LOADING", status: false});
}