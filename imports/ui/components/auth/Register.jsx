/**
 * @description Register component to handle registrations on the client
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import React from "react";
import { browserHistory } from "react-router";

//Actions
import { register } from "../../actions/AuthActions";

//Stores
import AuthStore from "../../stores/AuthStore";

//Components
import AuthForm from "./AuthForm";

export default class Register extends React.Component {

    componentWillMount() {
        this.handleRegistrationAttempt = this.handleRegistrationAttempt.bind(this);
        AuthStore.on("register", this.handleRegistrationAttempt);
    }

    componentWillUnmount() {
        AuthStore.removeListener("register", this.handleRegistrationAttempt);
    }

    register(event) {
        //Prevent form from posting
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        register(email, password);
    }

    handleRegistrationAttempt(error) {
        if (error) {
            console.log(error);
        } else {
            browserHistory.push("/dashboard");
        }
    }

    render() {
        return (
            <div className="register">
                <AuthForm submit={this.register} buttonTitle="Register" />
            </div>
        );
    }
}




