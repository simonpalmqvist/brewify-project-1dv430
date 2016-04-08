/* eslint-env mocha */
/**
 * @description Unit tests for the AuthForm component
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import { renderIntoDocumentWithMockedStore, getElementByName, getInputByType } from "../../../api/testUtils";
import faker from "faker";
import AuthForm from "./AuthForm";

const should = chai.should();
const state = {error: {}};

if (Meteor.isClient) {

    describe("AuthForm component", () => {
        it("Should have e-mail and password field", () => {

            const authForm = renderIntoDocumentWithMockedStore(<AuthForm submit={() => {}}/>, state);

            //Check so fields exist
            getElementByName(authForm, "email").should.exist;
            getElementByName(authForm, "password").should.exist;

        });

        describe("Button", () => {
            it("Should be disabled from start", () => {

                const authForm = renderIntoDocumentWithMockedStore(<AuthForm submit={() => {}}/>, state);

                //Button should be disabled after auth form is rendered.
                getInputByType(authForm, "submit").disabled.should.exist;
            });

            it("Should not be disabled if email and password is typed in", () => {

                const authForm = renderIntoDocumentWithMockedStore(<AuthForm submit={() => {}}/>, state);

                const email = getElementByName(authForm, "email");

                //Add some fake data
                email.value = faker.internet.email;
                getElementByName(authForm, "password").value = faker.name.lastName;

                //Simulate field change
                ReactTestUtils.Simulate.change(email);

                //Button should not be disabled anymore
                should.not.exist(getInputByType(authForm, "submit").attributes.disabled);
            });
        });
    });
}