/* eslint-env mocha */
/**
 * @description Integration tests for client side user registration flow
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import chai from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { getElementByName, renderIntoDocument } from "../../../api/test-utils";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";

import Register from "./Register";

const should = chai.should();
let register;
let email;
let password;
let form;

if (Meteor.isClient) {
    describe("Register component", () => {

        beforeEach(() => {

            //Reset db
            const testServer = Meteor.connect(Meteor.absoluteUrl());
            testServer.call("test.resetdb");

            //Render component
            register = renderIntoDocument(<Register/>);

            //get DOM elements
            email = getElementByName(register, "email");
            password = getElementByName(register, "password");
            form = ReactTestUtils.findRenderedDOMComponentWithTag(register, "form");
        });

        afterEach((done) => {
            Meteor.logout(() => {
                done();
            });
        });

        describe("User", () => {
            it("Should not be able to register with already registered email", (done) => {

                //Create separate connection to server
                const server = Meteor.connect(Meteor.absoluteUrl());

                //Create a user
                server.call("test.create-user", (error, account) => {

                    //Should not return error
                    should.not.exist(error);

                    //Add credentials
                    email.value = account.email;
                    password.value = faker.internet.password();

                    //Simulate a submit on form
                    ReactTestUtils.Simulate.submit(form);

                    //Listen for a failed registration
                    Accounts.onLoginFailure(() => {
                        should.not.exist(Meteor.user());
                        done();
                    });

                    //Listen for a successful registration
                    Accounts.onLogin(() => done(new Error("User could register")));
                });
            });

            it("Should be able to register an account and get logged in", (done) => {
                //Add credentials
                email.value = faker.internet.email();
                password.value = faker.internet.password();

                //Simulate a submit on form
                ReactTestUtils.Simulate.submit(form);

                //Listen for a failed registration
                Accounts.onLogin(() => {
                    Meteor.user().should.exist;
                    done();
                });

                //Listen for a successful registration
                Accounts.onLoginFailure(() => done(new Error("User could not register")));

            });

        });

    });
}