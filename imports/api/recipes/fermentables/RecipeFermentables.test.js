/* eslint-env mocha */
/**
 * @description Unit tests for collection and collections methods
 * @author simonpalmqvist
 */


import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import chai from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import { Recipes } from "../Recipes";
import { RecipeFermentables } from "./RecipeFermentables";

import { recipeFermentable, recipe } from "../../fakeData";

import "./methods";

const should = chai.should();
const { stub } = sinon;

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["recipes.fermentables.insert"];
    const updateMethod = Meteor.server.method_handlers["recipes.fermentables.update"];
    const removeMethod = Meteor.server.method_handlers["recipes.fermentables.remove"];

    let userId;
    let recipeId;
    let fermentableId;
    let fermentable;

    describe("Recipe Fermentables", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            fermentable = recipeFermentable();
            userId = fermentable.userId;
            recipeId = fermentable.recipeId;

        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add fermentables to recipe", function() {
                RecipeFermentables.insert(fermentable);

                // Recipe should be added
                RecipeFermentables.find({name: fermentable.name}).count().should.equal(1);
            });

            it("Should not be able to add fermentables without name", function() {
                delete fermentable.name;

                (() => RecipeFermentables.insert(fermentable)).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });

            it("Should not be able to add fermentables without amount", function() {
                delete fermentable.amount;

                (() => RecipeFermentables.insert(fermentable)).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });

            it("Should not be able to add fermentables without potential", function() {
                delete fermentable.potential;

                (() => RecipeFermentables.insert(fermentable)).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });

            it("Should not be able to add fermentables without EBC", function() {
                delete fermentable.ebc;

                (() => RecipeFermentables.insert(fermentable)).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });
        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new fermentable", function() {
                    const {name, potential, ebc} = fermentable;

                    (() => insertMethod(recipeId, name, potential, ebc)).should.throw(Error);

                    RecipeFermentables.find({}).count().should.equal(0);
                });

                it("Should not be able to remove fermentable", function() {
                    fermentableId = RecipeFermentables.insert(fermentable);

                    (() => removeMethod(fermentableId)).should.throw(Error);

                    RecipeFermentables.find({}).count().should.equal(1);
                });

                it("Should not be able to update recipe", function() {
                    fermentableId = RecipeFermentables.insert(fermentable);

                    (() => updateMethod(fermentableId, {name: recipeFermentable().name})).should.throw(Error);

                    RecipeFermentables.findOne(fermentableId).name.should.equal(fermentable.name);
                });
            });

            describe("Authenticated", function() {
                before(function() {
                    stub(Meteor, "userId", () => userId);
                });

                beforeEach(function() {
                    recipeId = Recipes.insert(recipe(userId));
                });

                after(function() {
                    Meteor.userId.restore();
                });


                it("Should be able to insert new fermentable", function() {
                    const {name, potential, ebc} = fermentable;

                    insertMethod(recipeId, name, potential, ebc);

                    RecipeFermentables.find({}).count().should.equal(1);
                });

                it("Should be able to remove fermentable", function() {
                    fermentableId = RecipeFermentables.insert(fermentable);

                    removeMethod(fermentableId);

                    RecipeFermentables.find({}).count().should.equal(0);
                });

                it("Should be able to update fermentable", function() {
                    let newName = recipeFermentable().name;

                    fermentableId = RecipeFermentables.insert(fermentable);

                    updateMethod(fermentableId, {name: newName});

                    RecipeFermentables.findOne(fermentableId).name.should.equal(newName);
                });
            });

        });

    });
}