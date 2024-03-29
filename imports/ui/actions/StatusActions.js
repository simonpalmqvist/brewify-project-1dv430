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
    //First remove message to get the animation
    removeMessage();
    _dispatchLater({type: "ERROR_MESSAGE", error}, 100);
}

/**
 * Dispatches action save to indicate that last call to the server saved the current progress
 */
export function saveAction() {
    //Don't remove earlier message since save always comes after saving
    Store.dispatch({type: "SAVE_MESSAGE"});

    //Remove save message after five seconds
    _dispatchLater({type: "REMOVE_MESSAGE"}, 4000);
}

/**
 * Dispatches action saving to indicate that data is currently being saved
 */
export function savingAction() {
    //First remove message to get the animation
    removeMessage();
    _dispatchLater({type: "SAVING_MESSAGE"}, 100);
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

function _dispatchLater(action, delay) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        Store.dispatch(action);
    }, delay);
}