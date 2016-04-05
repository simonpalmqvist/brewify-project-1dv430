/**
 * @description Authentication actions that can be called
 * @author simonpalmqvist
 */

//Modules
import Dispatcher from "../dispatcher";

export function login(email, password) {
    Dispatcher.dispatch({
        type: "LOGIN_USER",
        email,
        password
    });
}

export function register(email, password) {
    Dispatcher.dispatch({
        type: "REGISTER_USER",
        email,
        password
    });
}

export function logout() {
    Dispatcher.dispatch({type: "LOGOUT_USER"});
}

