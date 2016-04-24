/* eslint-env mocha */
/**
 * @description Integration tests for dashboard page and child components
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";

import { _ } from "meteor/underscore";
import { sinon } from "meteor/practicalmeteor:sinon";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import { createRecipes, stubCollections, restoreCollections, renderIntoDocument } from "../../api/testUtils";

import { Recipes } from "../../api/recipes/Recipes";
import Dashboard from "./Dashboard";

const should = chai.should();

if (Meteor.isClient) {
    describe("Dashboard page", function() {
        beforeEach(function() {
            stubCollections([Recipes]);
        });

        afterEach(function() {
            restoreCollections();
        });


        it("Renders correctly with recipes", function() {
            const numberOfRecipes = 3;
            const recipes = createRecipes(numberOfRecipes);

            const dashboard = renderIntoDocument(<Dashboard />);

            const list = ReactTestUtils.findRenderedDOMComponentWithTag(dashboard, "ul");



            const listNames = _.compact(_.map(list.children, (el) => el.textContent));
            const recipeNames = _.map(recipes, (recipe) => recipe.name);

            list.children.length.should.equal(numberOfRecipes);
            listNames.should.deep.equal(recipeNames);
        });
    });
}

