/* eslint-env mocha */
/**
 * @description Integration tests for Client side login flow
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { getElementByName } from "../../../api/test-utils";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";

import Login from "./Login";

const should = chai.should();
let login;
let email;
let password;
let form;

if (Meteor.isClient) {
    describe("Login component", () => {

        beforeEach(() => {
            //Reset database
            const server = Meteor.connect(Meteor.absoluteUrl());
            server.call("test.resetdb");

            //Render component
            login = ReactTestUtils.renderIntoDocument(<Login/>);

            //get DOM elements
            email = getElementByName(login, "email");
            password = getElementByName(login, "password");
            form = ReactTestUtils.findRenderedDOMComponentWithTag(login, "form");
        });

        afterEach((done) => {
            Meteor.logout(() => {
                done();
            });
        });

        describe("User", () => {
            it("Should be able to login with correct credentials", (done) => {

                //Create new connection to server
                const server = Meteor.connect(Meteor.absoluteUrl());

                //Create a user
                server.call("test.create-user", (error, account) => {

                    //Should not return error
                    should.not.exist(error);

                    //Add credentials
                    email.value = account.email;
                    password.value = account.password;

                    //Simulate a submit on form
                    ReactTestUtils.Simulate.submit(form);

                    //Listen for a successful login
                    Accounts.onLogin(() => {
                        Meteor.user().should.exist;
                        done();
                    });

                    //Listen for a failed login
                    Accounts.onLoginFailure(() => done(new Error("User could not login")));
                });
            });

            it("Should not be able to login with wrong credentials", (done) => {

                //Add credentials
                email.value = faker.internet.email();
                password.value = faker.internet.password();

                //Simulate a submit on form
                ReactTestUtils.Simulate.submit(form);

                //Listen for a failed login
                Accounts.onLoginFailure(() => {
                    should.not.exist(Meteor.user());
                    done();
                });

                //Listen for a successful login
                Accounts.onLogin(() => done(new Error("User could login")));
            });

        });

    });
}