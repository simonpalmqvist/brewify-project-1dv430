/* eslint-env mocha */
/**
 * @description Integration tests for recipe page and child components
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";
import { _ } from "meteor/underscore";
import { sinon } from "meteor/practicalmeteor:sinon";
import faker from "faker";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import {
    createRecipes,
    createFermentables,
    stubCollections,
    restoreCollections,
    renderIntoDocument,
    getElementByName
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
    let fermentables;
    let recipe;

    describe("Recipe page", function() {
        beforeEach(function(done) {
            stubCollections([Recipes, RecipeFermentables]);
            recipe = createRecipes(numberOfRecipes)[0];

            Meteor.callPromise("test.generate-fermentables", numberOfFermentables)
                .then((result) => {
                    fermentables = result;
                    return Meteor.callPromise("test.stub-user-id", recipe.userId);
                })
                .then(() => done());
        });

        afterEach(function(done) {
            restoreCollections();
            Meteor.callPromise("test.restore-user-id").then(() => done());
        });

        it("Should Render correctly with recipe", function() {
            const recipePage = renderIntoDocument(<Recipe params={{id: recipe._id}} />);

            const input = getElementByName(recipePage, "name");

            //Name should have recipe name
            input.value.should.equal(recipe.name);
        });

        it("Should be able to change recipe name", function() {
            const recipePage = renderIntoDocument(<Recipe params={{id: recipe._id}} />);

            const newName = faker.lorem.words();

            const input = getElementByName(recipePage, "name");

            //Simulate change of new name
            input.value = newName;
            ReactTestUtils.Simulate.change(input);

            //Simulate blur to update database
            ReactTestUtils.Simulate.blur(input);

            //Both input and recipe should have the new name
            input.value.should.equal(newName);
            Recipes.findOne(recipe._id).name.should.equal(newName);
        });

        it("Should be able to change batchSize", function() {
            const recipePage = renderIntoDocument(<Recipe params={{id: recipe._id}} />);

            const newBatchSize = faker.random.number({min: 10, max: 1000});

            const input = getElementByName(recipePage, "batchSize");

            //Simulate change of new batchSize
            input.value = newBatchSize;
            ReactTestUtils.Simulate.change(input);

            //Simulate blur to update database
            ReactTestUtils.Simulate.blur(input);

            //Both input and recipe should have the new batchSize
            input.value.should.equal(newBatchSize.toString());
            Recipes.findOne(recipe._id).batchSize.should.equal(newBatchSize);
        });
    });
}

