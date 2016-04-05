/**
 * @description Login component to handle authentication of users in the client
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";

import AuthForm from "./AuthForm";

export default class Login extends React.Component {

    login(event) {
        //Prevent form from posting
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        const data = {
            email: email,
            password: password
        };

        //Try to login with form data
        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                console.log(error);
            } else {
                browserHistory.push("/");
            }
        });
    }

    render() {
        return (
            <div className="login">
                <AuthForm submit={this.login} buttonTitle="Login" />
            </div>
        );
    }
}




