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
import { sinon } from "meteor/practicalmeteor:sinon";
import faker from "faker";
import { StubCollections } from "meteor/stub-collections";
import React from "react";
import { Provider } from "react-redux";
import ReactTestUtils from "react-addons-test-utils";

//Collections
import { Recipes } from "../api/recipes/Recipes";
import { RecipeFermentables } from "../api/recipes/fermentables/RecipeFermentables";
import { BrewProfiles } from "../api/brewprofiles/BrewProfiles";
import { Fermentables } from "../api/brewerydb/Fermentables";
import { Hops } from "../api/brewerydb/Hops";

import Store from "../ui/store";


//Server test methods

Meteor.methods({
    "test.resetdb": () => resetDatabase(),

    "test.generate-recipes": (numberOfItems, id) => {
        return createRecipes(numberOfItems, id);
    },

    "test.generate-fermentables": (numberOfItems) => {
        return createFermentables(numberOfItems);
    },

    "test.generate-hops": (numberOfItems) => {
        return createHops(numberOfItems);
    },

    "test.get-recipes": () => {
        return Recipes.find({}).fetch();
    },

    "test.create-user": () => {
        const data = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        userId = Accounts.createUser(data);

        console.log(userId);

        brewProfile = {
            userId,
            efficiency: faker.random.number({min: 0, max: 100}),
            batchSize: faker.random.number({min: 0, max: 1000}),
            boilTime: faker.random.number({min: 0, max: 120}),
            evapRate: faker.random.number({min: 0, max: 100}),
            waterGrainRatio: faker.random.number({min: 0, max: 10}),
            boilLoss: faker.random.number({min: 0, max: 10}),
            lauterDeadSpace: faker.random.number({min: 0, max: 10}),
            grainTemp: faker.random.number({min: 0, max: 100})
        };

        BrewProfiles.insert(brewProfile);

        return data;
    },

    "test.stub-user-id": (userId) => {
        sinon.stub(Meteor, "userId", () => userId);
    },

    "test.restore-user-id": () => {
        Meteor.userId.restore();
    }
});

//Helper functions

/**
 * Server: Creates recipes and inserts them in collection
 * @param times - number of recipes that should be created
 * @param id - user id if none it will take a random one
 * @returns {Array} - array of created recipes
 */
export function createRecipes(times, id) {
    let ids = _.times(times, i => _createRecipe(id));
    return _.map(ids, id => Recipes.findOne(id));
}

/**
 * Function creates recipe for collection
 * @param id - user id if none it will take a random one
 * @returns {Object} - returns the created recipe
 * @private
 */
function _createRecipe(id) {
    return Recipes.insert(_recipe(id));
}

/**
 * Function to generate recipe obj with fake data
 * @param id - userId
 * @returns {{userId: String, name: String, batchSize: Number, boilTime: Number}}
 * @private
 */
function _recipe(id) {
    return {
        userId: id || Random.id(),
        name: faker.lorem.words(),
        batchSize: faker.random.number({min: 10, max: 1000}),
        boilTime: faker.random.number({min: 30, max: 1000})
    };
}

/**
 * Server: Creates fermentables and inserts them in collection
 * @param times - number of fermentables that should be created
 * @returns {Array} - array of created fermentables
 */
export function createFermentables(times) {
    let ids = _.times(times, i => _createFermentable());
    return _.map(ids, id => Fermentables.findOne(id));
}

/**
 * Function to insert fermentable into collection
 * @returns {Object}
 * @private
 */
function _createFermentable() {
    return Fermentables.insert(_fermentable());
}

/**
 * Function to generate fermentable obj with fake data
 * @returns {{id: String, name: String, srmPrecise: Number, dryYield: Number}}
 * @private
 */
function _fermentable() {
    return {
        id: faker.random.number({min: 1, max: 1000}),
        name: faker.lorem.words(),
        srmPrecise: faker.random.number({min: 2, max: 1000}),
        potential: faker.random.number({min: 1.000, max: 1.060, precision: 0.001})
    };
}

/**
 * Server: Creates hops and inserts them in collection
 * @param times - number of hops that should be created
 * @returns {Array} - array of created hops
 */
export function createHops(times) {
    let ids = _.times(times, i => _createHop());
    return _.map(ids, id => Hops.findOne(id));
}

/**
 * Function to insert hop into collection
 * @returns {Object}
 * @private
 */
function _createHop() {
    return Hops.insert(_hop());
}

/**
 * Function to generate hops obj with fake data
 * @returns {{id: String, name: String, alphaAcidMin: Number, alphaAcidMax: Number}}
 * @private
 */
function _hop() {
    return {
        id: faker.random.number({min: 1, max: 1000}),
        name: faker.lorem.words(),
        alphaAcidMin: faker.random.number({min: 0, max: 100, precision: 0.01}),
        alphaAcidMax: faker.random.number({min: 0, max: 100, precision: 0.01})
    };
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

function _matchFun(match) {
    return  (val) =>  match ? match === val : true;
}

function _regexpFind(str,regex) {
    let result = str.match(regex);

    if(result) {
        result = result[1];
    }

    console.log(result);

    return result;
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