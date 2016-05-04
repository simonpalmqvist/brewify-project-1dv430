/* eslint-env mocha */
/**
 * @description Unit tests for Input component
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { should } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import React from "react";
import { findDOMNode } from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";

import ConfirmButton from "./ConfirmButton";

let callback;
let button;
let node;

if (Meteor.isClient) {
    describe("Button component", function() {
        beforeEach(function() {
            callback = sinon.spy();

            button = ReactTestUtils.renderIntoDocument(
                <ConfirmButton text="Delete"
                               symbol="×"
                               action={callback}/>
            );

            node = findDOMNode(button);
        });

        it("Should not run action function on one click", function() {
            ReactTestUtils.Simulate.click(node);

            callback.called.should.be.false;
        });

        it("Should run action function on two clicks", function() {
            ReactTestUtils.Simulate.click(node);
            ReactTestUtils.Simulate.click(node);

            callback.called.should.be.true;
        });
    });
}