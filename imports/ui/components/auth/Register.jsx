/**
 * @description Register component to handle registrations on the client
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { Accounts } from "meteor/accounts-base";
import AuthForm from "./AuthForm";

export default class Register extends React.Component {

    register(event) {
        //Prevent form from posting
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;


        const data = {
            email: email,
            password: password
        };

        //Try to create user
        Accounts.createUser(data, (error) => {
            if (error) {
                console.log(error);
            } else {
                browserHistory.push("/dashboard");
            }
        });
    }

    render() {
        return (
            <div className="register">
                <AuthForm submit={this.register} buttonTitle="Register" />
            </div>
        );
    }
}




