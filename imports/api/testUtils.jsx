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
import React from "react";
import { Provider } from "react-redux";
import ReactTestUtils from "react-addons-test-utils";

//Collections
import { Items } from "../api/items/Items";
import Store from "../ui/store";

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
    },

    "test.set-user-id": () => {
        return this.setUserId(faker.random.uuid);
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

/**
 * React helper function to get element by name
 * @param parentComponent
 * @param name
 * @returns {Element}
 */
export function getElementByName(parentComponent, name) {
    return ReactTestUtils.findAllInRenderedTree(parentComponent, (el) => el.name === name)[0];
}

/**
 * React helper function to get input with type
 * @param parentComponent
 * @param type
 * @returns {Element}
 */
export function getInputByType(parentComponent, type) {
    return ReactTestUtils.findAllInRenderedTree(parentComponent, (el) => {
        return el.type === type && el.tagName === "INPUT";
    })[0];
}

/**
 * Helper function to render react component with Store
 * @param component
 * @returns {Component}
 */
export function renderIntoDocument(component) {
    //Render component
    return ReactTestUtils.renderIntoDocument(<Provider store={Store}>{component}</Provider>);
}

/**
 * Helper function to render react component with mocked Store
 * @param component
 * @param state
 * @returns {Component}
 */
export function renderIntoDocumentWithMockedStore(component, state = {}) {
    return ReactTestUtils.renderIntoDocument(<Provider store={mockedStore(state)}>{component}</Provider>);
}

/**
 * Private function to create a mocked store with specified state
 * @param state
 * @returns {{subscribe: Function, dispatch: Function, getState: Function}}
 */
function mockedStore(state) {
    return {
        subscribe: () => {},
        dispatch: () => {},
        getState: () => {
            return {...state};
        }
    };
}