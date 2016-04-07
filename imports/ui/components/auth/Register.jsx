/**
 * @description Register component to handle registrations on the client
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import React from "react";

//Actions
import { registerUser } from "../../actions/AuthActions";

//Components
import AuthForm from "./AuthForm";

export default class Register extends React.Component {
    register(event) {
        //Prevent form from posting
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        registerUser(email, password);
    }

    render() {
        return (
            <div className="register">
                <AuthForm submit={this.register} buttonTitle="Register" />
            </div>
        );
    }
}




