/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";



import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";
import Register from "./Register";

const should = chai.should();

if (Meteor.isClient) {
    describe("Register component", () => {
        it("Should have e-mail and password field", () => {

            const register = ReactTestUtils.renderIntoDocument(<Register/>);

            //Check so values exist
            register.refs.email.should.exist;
            register.refs.password.should.exist;

        });

        describe("Button", () => {
            it("Should be disabled from start", () => {

                const register = ReactTestUtils.renderIntoDocument(<Register/>);

                register.refs.button.attributes.disabled.should.exist;
            });

            it("Should not be disabled if email and password is typed in", () => {

                const register = ReactTestUtils.renderIntoDocument(<Register/>);

                register.refs.email.value = faker.internet.email;
                register.refs.password.value = faker.name.lastName;

                ReactTestUtils.Simulate.change(register.refs.email);

                should.not.exist(register.refs.button.attributes.disabled);
            });
        });
    });
}