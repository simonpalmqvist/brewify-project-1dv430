/* eslint-env mocha */
/**
 * @description Integration tests for recipe page and child components
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";
import { _ } from "meteor/underscore";
import faker from "faker";
import React from "react";
import { findDOMNode } from "react-dom";
import ReactTestUtils from "react-addons-test-utils";

//Helpers
import {
    createRecipes,
    stubCollections,
    restoreCollections,
    renderSmartComponentIntoDocument
} from "../../api/testUtils";

//Collections
import { Recipes } from "../../api/recipes/Recipes";
import { RecipeFermentables } from "../../api/recipes/fermentables/RecipeFermentables";

//Components
import Recipe from "./Recipe";

if (Meteor.isClient) {
    const should = chai.should();
    const numberOfRecipes = 1;
    const numberOfFermentables = 10;
    let recipePage;
    let fakeDocument;
    let fermentables;
    let recipe;
    let input;

    describe("Recipe page", function() {
        beforeEach(function(done) {
            stubCollections([Recipes, RecipeFermentables]);
            recipe = createRecipes(numberOfRecipes)[0];

            Meteor.callPromise("test.generate-fermentables", numberOfFermentables)
                .then((result) => {
                    fermentables = result;
                    return Meteor.callPromise("test.stub-user-id", recipe.userId);
                })
                .then(() => {
                    recipePage = renderSmartComponentIntoDocument(<Recipe params={{id: recipe._id}} />);
                    fakeDocument = findDOMNode(recipePage);
                    done();
                });
        });

        afterEach(function(done) {
            restoreCollections();
            Meteor.callPromise("test.restore-user-id").then(() => done());
        });

        it("Should Render correctly with recipe", function() {
            input = fakeDocument.querySelector("input[name=name]");

            //Name should have recipe name
            input.value.should.equal(recipe.name);
        });

        it("Should be able to change recipe name", function() {
            input = fakeDocument.querySelector("input[name=name]");

            const newName = faker.lorem.words();

            //Simulate change of new name
            input.value = newName;
            ReactTestUtils.Simulate.change(input);

            //Simulate blur to update database
            ReactTestUtils.Simulate.blur(input);

            //Both input and recipe should have the new name
            input.value.should.equal(newName);
            Recipes.findOne(recipe._id).name.should.equal(newName);
        });

        it("Should be able to change batch size", function() {
            const newBatchSize = faker.random.number({min: 10, max: 1000});

            input = fakeDocument.querySelector("input[name=batchSize]");

            //Simulate change of new batchSize
            input.value = newBatchSize;
            ReactTestUtils.Simulate.change(input);

            //Simulate blur to update database
            ReactTestUtils.Simulate.blur(input);

            //Both input and recipe should have the new batchSize
            input.value.should.equal(newBatchSize.toString());
            Recipes.findOne(recipe._id).batchSize.should.equal(newBatchSize);
        });

        it("Should be able to change boil time", function() {
            const newBoilTime = faker.random.number({min: 10, max: 1000});

            input = fakeDocument.querySelector("input[name=boilTime]");

            //Simulate change of new batchSize
            input.value = newBoilTime;
            ReactTestUtils.Simulate.change(input);

            //Simulate blur to update database
            ReactTestUtils.Simulate.blur(input);

            //Both input and recipe should have the new batchSize
            input.value.should.equal(newBoilTime.toString());
            Recipes.findOne(recipe._id).boilTime.should.equal(newBoilTime);
        });
    });
}

