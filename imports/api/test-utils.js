/**
 * @description Test utils for unit, integration and acceptance tests
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Factory } from "meteor/dburles:factory";
import { _ } from "meteor/underscore";
import { resetDatabase } from "meteor/xolvio:cleaner";
import faker from "faker";
import { StubCollections } from "meteor/stub-collections";
import ReactTestUtils from "react-addons-test-utils";

//Collections
import { Items } from "../api/items/Items";

//Server test methods

Meteor.methods({
    "test.resetdb": () => resetDatabase(),

    "test.generate-items": (numberOfItems) => {
        return createItems(numberOfItems);
    },

    "test.create-user": () => {
        const data = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        Accounts.createUser(data);

        return data;
    }
});

//Factories for easier adding data to collections
Factory.define("item", Items, {text: () => faker.lorem.words()});

//Helper functions

/**
 * Client: Creates items for collection
 * @param numberOfItems - number of items that should be created
 * @returns {Array} - array of created items
 */
export function createItems(numberOfItems) {
    return _.times(numberOfItems, i => Factory.create("item"));
}

/**
 * Client: Stubs the Items collection
 */
export function stubItems() {
    StubCollections.stub(Items);
}

/**
 * Client: restores all stubbed collections
 */
export function restoreCollections() {
    StubCollections.restore();
}

export function getElementByName(parentComponent, name) {
    return ReactTestUtils.findAllInRenderedTree(parentComponent, (el) => el.name === name)[0];
}