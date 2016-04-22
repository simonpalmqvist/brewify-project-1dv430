/**
 * @description AuthForm component for validating user input before trying to create/login user
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";

import { connect }  from "react-redux";

class AuthForm extends React.Component {

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
        const { error, submit, buttonTitle } = this.props;
        const { disabled } = this.state;

        let reason;

        if (error) {
            reason = error.reason;
        }

        return (
            <form id="auth-form" onSubmit={submit.bind(this)}>
                <p>{reason}</p>
                <label htmlFor="email">E-mail:</label>
                <input id="email"
                       ref="email"
                       type="email"
                       name="email"
                       placeholder="E-mail"
                       onChange={this.validate.bind(this)}/>
                <label htmlFor="password">Password:</label>
                <input id="password"
                       ref="password"
                       type="password"
                       name="password"
                       placeholder="Password"
                       onChange={this.validate.bind(this)}/>
                <input ref="button"
                       type="submit"
                       value={buttonTitle}
                       disabled={disabled}/>
            </form>
        );
    }
}


//Map the current state to the properties in component
export default connect(({flashMessages}) => ({error: flashMessages.error}))(AuthForm);



