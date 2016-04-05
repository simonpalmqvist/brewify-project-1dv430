/**
 * @description AuthForm component for validating user input before trying to create/login user
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";

export default class AuthForm extends React.Component {

    constructor() {
        super();
        this.state = {disabled: true};
    }

    validate() {

        //Check so email and password are filled in and if not disable button
        let disabled = true;
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        if (email && password) {
            disabled = false;
        }

        this.setState({disabled});
    }

    render() {
        return (
            <form id="auth-form" onSubmit={this.props.submit.bind(this)}>
                <label htmlFor="email">Email:</label>
                <input ref="email" type="email" name="email" onChange={this.validate.bind(this)}/>
                <label htmlFor="password">Password:</label>
                <input ref="password" type="password" name="password" onChange={this.validate.bind(this)}/>
                <input ref="button" type="submit" value={this.props.buttonTitle} disabled={this.state.disabled}/>
            </form>
        );
    }
}




