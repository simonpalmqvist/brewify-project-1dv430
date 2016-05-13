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
import { Yeasts } from "../api/brewerydb/Yeasts";
import { Ingredients } from "../api/brewerydb/Ingredients";
import { Styles } from "../api/brewerydb/Styles";

import {
    brewProfile,
    recipe,
    fermentable,
    hop,
    yeast,
    ingredient,
    style

} from "./fakeData";

import Store from "../ui/store";


//Server test methods

Meteor.methods({
    "test.resetdb": () => resetDatabase(),

    "test.generate-recipes": (numberOfItems, id) => {
        return createRecipes(numberOfItems, id);
    },

    "test.generate-fermentables": (numberOfItems) => {
        return _createDataInCollections(Fermentables, fermentable, numberOfItems);
    },

    "test.generate-hops": (numberOfItems) => {
        return _createDataInCollections(Hops, hop, numberOfItems);
    },

    "test.generate-yeasts": (numberOfItems) => {
        return _createDataInCollections(Yeasts, yeast, numberOfItems);
    },

    "test.generate-ingredients": (numberOfItems) => {
        return _createDataInCollections(Ingredients, ingredient, numberOfItems);
    },

    "test.generate-styles": (numberOfItems) => {
        return _createDataInCollections(Styles, style, numberOfItems);
    },

    "test.get-recipes": () => {
        return Recipes.find({}).fetch();
    },

    "test.create-user": () => {
        const data = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const userId = Accounts.createUser(data);

        BrewProfiles.insert(brewProfile(userId));

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
 * Server: Creates items and inserts them in collection
 * @param collection - collection in where to insert items
 * @param data - function to return data to be inserted
 * @param times - number of inserts to be made
 * @returns {Array} - array of created items
 */
function _createDataInCollections(collection, data, times) {
    let ids = _.times(times, i => _createData(collection, data));
    return _.map(ids, id => collection.findOne(id));
}

function _createData(collection, data) {
    return collection.insert(data);
}

/**
 * Server: Creates recipes and inserts them in collection
 * @param times - number of recipes that should be created
 * @param id - user id if none it will take a random one
 * @returns {Array} - array of created recipes
 */
export function createRecipes(times, id) {
    let ids = _.times(times, i => Recipes.insert(recipe(id)));
    return _.map(ids, id => Recipes.findOne(id));
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
 * Helper function to render react component with Store
 * @param component
 * @returns {Component}
 */
export function renderSmartComponentIntoDocument(component) {
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