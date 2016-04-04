import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import { Accounts } from "meteor/accounts-base";


export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {disabled: true};
    }

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
                browserHistory.push("/");
            }
        });
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
            <div className="register">
                <form onSubmit={this.register.bind(this)}>
                    <label htmlFor="email">Email:</label>
                    <input ref="email" type="email" name="email" onChange={this.validate.bind(this)}/>
                    <label htmlFor="password">Password:</label>
                    <input ref="password" type="password" name="password" onChange={this.validate.bind(this)}/>
                    <input ref="button" type="submit" value="Register" disabled={this.state.disabled}/>
                </form>
            </div>
        );
    }
}




