/* eslint-env mocha */
/**
 * @description Unit tests for Input component
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { should } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";

import Select from "./Select";

let callback;
let name;
let options;
let select;
let node;

if (Meteor.isClient) {
    describe("Select component", function() {
        beforeEach(function() {
            let i;

            callback = sinon.spy();
            name = faker.lorem.word();
            options = {};

            for (i = 0; i < 10; i += 1) {
                options[faker.lorem.words()] = i;
            }

            select = ReactTestUtils.renderIntoDocument(
                <Select name={name}
                        options={options}
                        value={"1"}
                        onUpdate={callback}/>
            );

            node = select.refs.select;

        });

        it("Should run update function if state has changed", function() {
            node.value = 9;

            ReactTestUtils.Simulate.change(node);

            callback.called.should.be.true;
            node.value.should.equal("9");
        });

        it("Should not run update function if state has not changed", function() {
            ReactTestUtils.Simulate.change(node);

            callback.called.should.be.false;
            node.value.should.equal("1");
        });
    });
}