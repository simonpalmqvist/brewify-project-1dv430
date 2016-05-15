/**
 * @description Login component to handle authentication of users in the client
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import React from "react";

//Actions
import { loginUser } from "../../actions/AuthActions";

//Components
import AuthForm from "./AuthForm";
import { Link } from "react-router";

export default class Login extends React.Component {

    login(event) {
        //Prevent form from posting
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        loginUser(email, password);
    }

    render() {
        return (
            <div className="login">
                <AuthForm submit={this.login} buttonTitle="Login" />
                <p>Don't have an account? <Link to="/register">register here</Link></p>
            </div>
        );
    }
}




