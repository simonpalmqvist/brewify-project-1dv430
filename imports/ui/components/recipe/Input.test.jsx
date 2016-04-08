/* eslint-env mocha */

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
                       updateFun={callback}/>
            );

            let node = input.refs.input;

            node.value = faker.lorem.words();
            ReactTestUtils.Simulate.change(node);

            ReactTestUtils.Simulate.blur(node);


            callback.called.should.be.true;
        });

        it("Should not run update function if state has not changed", function() {
            let callback = sinon.spy();
            let name = faker.lorem.word();
            let value = faker.lorem.words();


            const input = ReactTestUtils.renderIntoDocument(
                <Input type="text"
                       name= {name}
                       value={value}
                       updateFun={callback}/>
            );

            let node = input.refs.input;
            ReactTestUtils.Simulate.blur(node);

            callback.called.should.be.false;
        });

        it("Should update state if value props change", function() {
           //TODO: Implement this test.
        });
    });
}