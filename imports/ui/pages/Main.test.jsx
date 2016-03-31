/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { Factory } from "meteor/dburles:factory";
import { Random } from "meteor/random";
import { expect } from "meteor/practicalmeteor:chai";
import { StubCollections } from "meteor/stub-collections";
import { _ } from "meteor/underscore";
import { sinon } from "meteor/practicalmeteor:sinon";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";

import Main from "./Main";
import { Items } from "../../api/items/Items";

Factory.define("item", Items, {text: () => faker.lorem.words()});

if (Meteor.isClient) {
    describe("Main page", () => {
        beforeEach(() => {
            StubCollections.stub(Items);

            sinon.stub(Meteor, "subscribe", () => {
                return {
                    subscriptionId: 0,
                    ready: () => true
                };
            });
        });

        afterEach(() => {
            StubCollections.restore();
            Meteor.subscribe.restore();
        });


        it("Renders correctly with items", () => {
            const items = _.times(3, i => Factory.create("item"));

            const main = ReactTestUtils.renderIntoDocument(<Main />);

            //Update state
            main.updateList();

            const list = ReactTestUtils.findRenderedDOMComponentWithTag(main, "ul");

            const listTexts = _.map(list.children, (el) => el.textContent);
            const itemTexts = _.map(items, (item) => item.text);

            expect(list.children.length).to.equal(3);
            expect(listTexts).to.deep.equal(itemTexts);
        });
    });
}

