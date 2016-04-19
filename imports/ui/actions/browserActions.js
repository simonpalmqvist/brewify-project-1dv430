/**
 * @description Browser actions for handling browser events
 * @author simonpalmqvist
 */

//Modules
import Store from "../store";
import { styles } from "../layouts/styles";

/**
 * Dispatches action error with specified error
 * @param width
 */
export function windowResize(width) {
    //Dispatch window resize and if new size is mobile
    Store.dispatch({type: "WINDOW_RESIZE", mobile: width <= styles.mobileMaxWidth });
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