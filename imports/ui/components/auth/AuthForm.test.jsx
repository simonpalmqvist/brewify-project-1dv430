/* eslint-env mocha */
/**
 * @description Unit tests for the AuthForm component
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";
import React from "react";
import { findDOMNode } from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import { renderIntoDocumentWithMockedStore } from "../../../api/testUtils";
import faker from "faker";
import AuthForm from "./AuthForm";



if (Meteor.isClient) {

    const should = chai.should();
    const state = {flashMessages: {}};

    let authForm;
    let fakeDocument;
    let email;
    let password;
    let button;

    describe("AuthForm component", function() {
        beforeEach(function() {
            authForm = renderIntoDocumentWithMockedStore(<AuthForm submit={() => {}}/>, state);

            fakeDocument = findDOMNode(authForm);

            email = fakeDocument.querySelector("input[name=email]");
            password = fakeDocument.querySelector("input[name=password]");
            button = fakeDocument.querySelector("input[type=submit]");
        });

        it("Should have e-mail and password field", function() {
            //Check so fields exist
            email.should.exist;
            password.should.exist;

        });

        describe("Button", function() {
            it("Should be disabled from start", function() {

                //Button should be disabled after auth form is rendered.
                button.disabled.should.exist;
            });

            it("Should not be disabled if email and password is typed in", function() {

                //Add some fake data
                email.value = faker.internet.email;
                password.value = faker.name.lastName;

                //Simulate field change
                ReactTestUtils.Simulate.change(email);

                //Button should not be disabled anymore
                should.not.exist(button.attributes.disabled);
            });
        });
    });
}