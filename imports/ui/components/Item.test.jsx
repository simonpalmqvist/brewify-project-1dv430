/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { expect } from "meteor/practicalmeteor:chai";

import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import faker from "faker";
import Item from "./Item";


if (Meteor.isClient) {
    describe("Item", () => {
        describe("component", () => {

            it("Should contain text", () => {
                const text = faker.lorem.words();
                const item = ReactTestUtils.renderIntoDocument(<Item key="1" item={text} />);
                const li = ReactTestUtils.findRenderedDOMComponentWithTag(item, "li");

                expect(li.textContent).to.equal(text);
            });

        });
    });
}