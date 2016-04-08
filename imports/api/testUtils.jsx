/**
 * @description Test utils for unit, integration and acceptance tests
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { _ } from "meteor/underscore";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Random } from "meteor/random";
import faker from "faker";
import { StubCollections } from "meteor/stub-collections";
import React from "react";
import { Provider } from "react-redux";
import ReactTestUtils from "react-addons-test-utils";

//Collections
import { Recipes } from "../api/recipes/Recipes";
import Store from "../ui/store";

//Server test methods

Meteor.methods({
    "test.resetdb": () => resetDatabase(),

    "test.generate-recipes": (numberOfItems, id) => {
        return createRecipes(numberOfItems, id);
    },

    "test.get-recipes": () => {
        return Recipes.find({}).fetch();
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

//Helper functions

/**
 * Client: Creates recipes for collection
 * @param times - number of recipes that should be created
 * @param id - user id if none it will take a random one
 * @returns {Array} - array of created recipes
 */
export function createRecipes(times, id) {
    let ids =  _.times(times, i => createRecipe(id));
    return _.map(ids, id => Recipes.findOne(id));
}

/**
 * Client: Creates recipe for collection
 * @param id - user id if none it will take a random one
 * @returns {Object} - returns the created recipe
 */
export function createRecipe(id) {
    return Recipes.insert(recipe(id));
}

export function recipe(id) {
    return {
        userId: id || Random.id(),
        name: faker.lorem.words(),
        batchSize: faker.random.number({min: 10, max: 1000}),
        boilTime: faker.random.number({min: 30, max: 1000})
    }
}

/**
 * Client: Stubs collections
 * @param collections - Array of collections to stub
 */
export function stubCollections(collections) {
    collections.forEach((collection) => StubCollections.stub(collection));

    sinon.stub(Meteor, "subscribe", () => {
        return {
            subscriptionId: 0,
            ready: () => true
        };
    });
}

/**
 * Client: restores all stubbed collections
 */
export function restoreCollections() {
    StubCollections.restore();
    Meteor.subscribe.restore();
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