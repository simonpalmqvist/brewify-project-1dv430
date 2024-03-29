/* eslint-env mocha */
/**
 * @description Unit tests for AutoComplete and AutoComplete field components
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { _ } from "meteor/underscore";
import chai from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";

import AutoComplete from "./AutoComplete";

if (Meteor.isClient) {

    const should = chai.should();

    let fakeData = [];
    let autoComplete;
    let inputNode;
    let childNode;
    let obj;
    let name;
    let callback;

    const pushFakeData = () => fakeData.push({id: faker.random.uuid(), name: faker.lorem.words()});

    describe("AutoComplete component", function() {

        beforeEach(function() {
            fakeData = [];
            _.times(10, pushFakeData);

            callback = sinon.spy();

            autoComplete = ReactTestUtils.renderIntoDocument(
                <AutoComplete data={fakeData} onSelected={callback}/>
            );

            inputNode = autoComplete.refs.input;
        });

        it("Should show list with proposals when focusing on input field", function() {

            ReactTestUtils.Simulate.focus(inputNode);

            callback.called.should.be.false;
            autoComplete.refs.list.children.length.should.equal(10);
        });

        it("Should call callback when field has been filled in and pressed enter", function() {

            ReactTestUtils.Simulate.focus(inputNode);

            //Set random name
            name = faker.lorem.words();
            inputNode.value = name;
            ReactTestUtils.Simulate.change(inputNode);

            //Trigger enter event
            ReactTestUtils.Simulate.keyDown(inputNode, {key: "Enter"});
            //Ugly hack since components blur event won't run in test
            ReactTestUtils.Simulate.blur(inputNode);

            callback.called.should.be.true;
            callback.should.be.calledWith({name});
        });

        it("Should be able to navigate with arrows", function() {

            ReactTestUtils.Simulate.focus(inputNode);

            //Should be be able to navigate down
            ReactTestUtils.Simulate.keyDown(inputNode, {key: "ArrowDown"});
            autoComplete.state.selected.should.equal(0);

            //Should not be able to navigate out of the list
            _.times(fakeData.length + 1, () => {
                ReactTestUtils.Simulate.keyDown(inputNode, {key: "ArrowDown"});
            });
            autoComplete.state.selected.should.equal(fakeData.length -1);

            childNode = autoComplete.refs[`child-${fakeData.length -1}`];

            //Ugly hack since components blur event won't run in test
            ReactTestUtils.Simulate.keyDown(inputNode, {key: "Enter"});
            ReactTestUtils.Simulate.blur(inputNode);

            callback.called.should.be.true;
            callback.should.be.calledWith(childNode.props.obj);
        });

        it("Should be able to select option in list with the mouse", function() {

            ReactTestUtils.Simulate.focus(inputNode);

            childNode = autoComplete.refs.list.children[2];
            obj = autoComplete.refs["child-2"].props.obj;

            ReactTestUtils.Simulate.click(childNode);

            callback.called.should.be.true;
            callback.should.be.calledWith(obj);
        });

        it("Should be able to exit without triggering callback", function() {

            ReactTestUtils.Simulate.focus(inputNode);

            ReactTestUtils.Simulate.blur(inputNode);

            callback.called.should.be.false;

            //List should not be shown
            should.not.exist(autoComplete.refs.list);
        });

        it("Should be able to filter list", function() {

            ReactTestUtils.Simulate.focus(inputNode);

            obj = autoComplete.refs["child-2"].props.obj;
            name = obj.name.substring(2, obj.name.length - 2);

            inputNode.value = name;

            ReactTestUtils.Simulate.change(inputNode);

            callback.called.should.be.false;

            autoComplete.refs.list.children.length.should.equal(1);
            autoComplete.refs["child-0"].props.obj.should.deep.equal(obj);
        });
    });
}