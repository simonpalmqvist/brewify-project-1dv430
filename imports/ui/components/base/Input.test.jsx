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

import Input from "./Input";

let callback;
let callback2;
let name;
let input;
let oldValue;
let node;
let newValue;

if (Meteor.isClient) {
    describe("Input component", function() {

        beforeEach(function() {
            callback = sinon.spy();
            name = faker.lorem.word();
            oldValue = faker.lorem.words();
            newValue = faker.lorem.words();

            input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name= {name}
                       value={oldValue}
                       onUpdate={callback}/>
            );

            node = findDOMNode(input).querySelector("input");

        });

        it("Should run update function if state has changed", function() {
            node.value = newValue;
            ReactTestUtils.Simulate.change(node);

            ReactTestUtils.Simulate.blur(node);

            callback.called.should.be.true;
            node.value.should.equal(newValue);
        });

        it("Should not run update function if state has not changed", function() {
            ReactTestUtils.Simulate.blur(node);

            callback.called.should.be.false;
        });

        it("Should not run update function if state value is empty", function() {
            node.value = "";
            ReactTestUtils.Simulate.change(node);

            ReactTestUtils.Simulate.blur(node);

            callback.called.should.be.false;
            node.value.should.equal(oldValue);
        });


        it("Should run validation function on change", function() {
            input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name={name}
                       value={oldValue}
                       validate={callback}
                       onUpdate={() => {}}/>
            );

            node = input.refs.input;

            node.value = newValue;
            ReactTestUtils.Simulate.change(node);

            callback.called.should.be.true;
            callback.calledWith(newValue);
        });

        it("Should not change value if validation function returns false", function() {
            let validate = () => false;

            input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name={name}
                       value={oldValue}
                       validate={validate}
                       onUpdate={callback}/>
            );

            node = input.refs.input;

            node.value = newValue;
            ReactTestUtils.Simulate.change(node);

            node.value.should.equal(oldValue);
        });
    });
}