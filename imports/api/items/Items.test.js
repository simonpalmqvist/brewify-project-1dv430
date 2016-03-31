/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { expect } from "meteor/practicalmeteor:chai";
import faker from "faker";

import { Items } from "./Items";

import "./methods";

if (Meteor.isServer) {
    describe("Items", () => {
        describe("methods", () => {

            beforeEach(() => resetDatabase());

            it("Should be able to add task", () => {
                const insert = Meteor.server.method_handlers["items.insert"];
                const text = faker.lorem.words();

                insert(text);

                // Adds one new item
                expect(Items.find().count()).to.equal(1);
                // Item with the added text exists
                expect(Items.find({text}).count()).to.equal(1);
            });

            it("Should not be able to add undefined item", () => {
                const insert = Meteor.server.method_handlers["items.insert"];
                const text = undefined;

                //Should throw error
                expect(() => insert(text)).to.throw("Text is required [validation-error]");
                //Should not add an item
                expect(Items.find().count()).to.equal(0);
            });

        });
    });
}