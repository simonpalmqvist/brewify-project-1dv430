/* eslint-env mocha */
/**
 * @description Unit tests for the AuthForm component
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";
import AuthForm from "./AuthForm";

const should = chai.should();

if (Meteor.isClient) {
    describe("AuthForm component", () => {
        it("Should have e-mail and password field", () => {

            const authForm = ReactTestUtils.renderIntoDocument(<AuthForm submit={() => {}}/>);

            //Check so fields exist
            authForm.refs.email.should.exist;
            authForm.refs.password.should.exist;

        });

        describe("Button", () => {
            it("Should be disabled from start", () => {

                const authForm = ReactTestUtils.renderIntoDocument(<AuthForm submit={() => {}}/>);

                //Button should be disabled after auth form is rendered.
                authForm.refs.button.attributes.disabled.should.exist;
            });

            it("Should not be disabled if email and password is typed in", () => {

                const authForm = ReactTestUtils.renderIntoDocument(<AuthForm submit={() => {}}/>);

                //Add some fake data
                authForm.refs.email.value = faker.internet.email;
                authForm.refs.password.value = faker.name.lastName;

                //Simulate field change
                ReactTestUtils.Simulate.change(authForm.refs.email);

                //Button should not be disabled anymore
                should.not.exist(authForm.refs.button.attributes.disabled);
            });
        });
    });
}