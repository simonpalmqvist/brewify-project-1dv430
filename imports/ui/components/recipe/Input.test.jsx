/* eslint-env mocha */
/**
 * @description Unit tests for Input component
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { should } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";

import Input from "./Input";

if (Meteor.isClient) {
    describe("Recipe Input component", function() {
        it("Should run update function if state has changed", function() {
            let callback = sinon.spy();
            let name = faker.lorem.word();
            let oldValue = faker.lorem.words();


            const input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name= {name}
                       value={oldValue}
                       onUpdate={callback}/>
            );

            let node = input.refs.input;

            let newValue = faker.lorem.words();

            node.value = newValue;
            ReactTestUtils.Simulate.change(node);

            ReactTestUtils.Simulate.blur(node);

            callback.called.should.be.true;
            node.value.should.equal(newValue);
        });

        it("Should not run update function if state has not changed", function() {
            let callback = sinon.spy();
            let name = faker.lorem.word();
            let value = faker.lorem.words();


            const input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name= {name}
                       value={value}
                       onUpdate={callback}/>
            );

            let node = input.refs.input;
            ReactTestUtils.Simulate.blur(node);

            callback.called.should.be.false;
        });

        it("Should not run update function if state value is empty", function() {
            let callback = sinon.spy();
            let name = faker.lorem.word();
            let value = faker.lorem.words();


            const input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name= {name}
                       value={value}
                       onUpdate={callback}/>
            );

            let node = input.refs.input;

            node.value = "";
            ReactTestUtils.Simulate.change(node);

            ReactTestUtils.Simulate.blur(node);

            callback.called.should.be.false;
            node.value.should.equal(value);
        });


        it("Should run validation function on change", function() {
            let callback = sinon.spy();
            let name = faker.lorem.word();
            let value = faker.lorem.words();


            const input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name= {name}
                       value={value}
                       validate={callback}/>
            );

            let node = input.refs.input;

            node.value = faker.lorem.words();
            ReactTestUtils.Simulate.change(node);

            callback.called.should.be.true;
        });

        it("Should run validation function on change", function() {
            let callback = sinon.spy();
            let name = faker.lorem.word();
            let value = faker.lorem.words();


            const input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name= {name}
                       value={value}
                       onChange={callback}/>
            );

            let node = input.refs.input;

            let newValue = faker.lorem.words();

            node.value = newValue;
            ReactTestUtils.Simulate.change(node);

            callback.called.should.be.true;
            callback.calledWith(newValue);
        });

        it("Should not change value if validation function returns false", function() {
            let callback = sinon.spy();
            let validate = () => false;
            let name = faker.lorem.word();
            let value = faker.lorem.words();


            const input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name={name}
                       value={value}
                       validate={validate}
                       onUpdate={callback}/>
            );

            let node = input.refs.input;

            node.value = faker.lorem.words();
            ReactTestUtils.Simulate.change(node);

            node.value.should.equal(value);
        });
    });
}