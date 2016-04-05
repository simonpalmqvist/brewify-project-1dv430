/**
 * @description Login component to handle authentication of users in the client
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";

//Actions
import { login } from "../../actions/AuthActions";

//Stores
import AuthStore from "../../stores/AuthStore";

//Components
import AuthForm from "./AuthForm";

export default class Login extends React.Component {

    constructor() {
        super();

        this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
    }

    componentWillMount() {
        AuthStore.on("login", this.handleLoginAttempt);
    }

    componentWillUnmount() {
        AuthStore.removeListener("login", this.handleLoginAttempt);
    }

    login(event) {
        //Prevent form from posting
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        login(email, password);
    }

    handleLoginAttempt(error) {
        if (error) {
            console.log(error);
        } else {
            browserHistory.push("/dashboard");
        }
    }

    render() {
        return (
            <div className="login">
                <AuthForm submit={this.login} buttonTitle="Login" />
            </div>
        );
    }
}




