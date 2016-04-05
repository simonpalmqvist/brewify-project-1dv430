/**
 * @description Store for authentication methods
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { EventEmitter } from "events";
import Dispatcher from "../dispatcher";


class AuthStore extends EventEmitter {
    constructor() {
        super();
    }

    login(email, password) {
        Meteor.loginWithPassword(email, password, (error) => {
            this.emit("login", error);
        });
    }

    register(email, password) {

        //Try to create user
        Accounts.createUser({email, password}, (error) => {
            this.emit("register", error);
        });
    }

    logout() {
        Meteor.logout(() => this.emit("logout"));
    }

    handleActions(action) {
        //Handle actions from dispatcher
        switch (action.type) {
            case "LOGIN_USER":
                this.login(action.email, action.password);
                break;
            case "LOGOUT_USER":
                this.logout();
                break;
            case "REGISTER_USER":
                this.register(action.email, action.password);
                break;
        }
    }
}

//Create item store
const authStore = new AuthStore();

//Register actions
Dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;