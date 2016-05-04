/* eslint-env mocha */
/**
 * @description Unit tests for collection and collections methods
 * @author simonpalmqvist
 */


import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import chai from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import { recipeHop, recipe } from "../../fakeData";

import { Recipes } from "../Recipes";
import { RecipeHops } from "./RecipeHops";

import "./methods";

const should = chai.should();
const { stub } = sinon;

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["recipes.hops.insert"];
    const updateMethod = Meteor.server.method_handlers["recipes.hops.update"];
    const removeMethod = Meteor.server.method_handlers["recipes.hops.remove"];

    let userId;
    let recipeId;
    let hopId;
    let hop;

    describe("Recipe Hops", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            hop = recipeHop();
            userId = hop.userId;
            recipeId = hop.recipeId;
        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add hops to recipe", function() {
                hopId = RecipeHops.insert(hop);

                // Recipe should be added
                RecipeHops.find(hopId).count().should.equal(1);
            });

            it("Should not be able to add hops without name", function() {
                delete hop.name;

                (() => RecipeHops.insert(hop)).should.throw(Error);

                //Recipe should not be added
                RecipeHops.find({}).count().should.equal(0);
            });

            it("Should not be able to add hops without form", function() {
                delete hop.form;

                (() => RecipeHops.insert(hop)).should.throw(Error);

                //Recipe should not be added
                RecipeHops.find({}).count().should.equal(0);
            });

            it("Should not be able to add hops without use", function() {
                delete hop.use;

                (() => RecipeHops.insert(hop)).should.throw(Error);

                //Recipe should not be added
                RecipeHops.find({}).count().should.equal(0);
            });

            it("Should not be able to add hops without alpha", function() {
                delete hop.alpha;

                (() => RecipeHops.insert(hop)).should.throw(Error);

                //Recipe should not be added
                RecipeHops.find({}).count().should.equal(0);
            });

            it("Should not be able to add hops without amount", function() {
                delete hop.amount;

                (() => RecipeHops.insert(hop)).should.throw(Error);

                //Recipe should not be added
                RecipeHops.find({}).count().should.equal(0);
            });

            it("Should not be able to add hops without time", function() {
                delete hop.time;

                (() => RecipeHops.insert(hop)).should.throw(Error);

                //Recipe should not be added
                RecipeHops.find({}).count().should.equal(0);
            });
        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new hop", function() {
                    (() => insertMethod(recipeId, hop.use, hop.name, hop.alpha, hop.form)).should.throw(Error);

                    RecipeHops.find({}).count().should.equal(0);
                });

                it("Should not be able to remove hop", function() {
                    hopId = RecipeHops.insert(hop);

                    (() => removeMethod(hopId)).should.throw(Error);

                    RecipeHops.find({}).count().should.equal(1);
                });

                it("Should not be able to update hop", function() {
                    hopId = RecipeHops.insert(hop);

                    (() => updateMethod(hopId, {name: recipeHop().name})).should.throw(Error);

                    RecipeHops.findOne(hopId).name.should.equal(hop.name);
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


                it("Should be able to insert new hop", function() {

                    insertMethod(recipeId, hop.use, hop.name, hop.alpha, hop.form);

                    RecipeHops.find({}).count().should.equal(1);
                });

                it("Should be able to remove hop", function() {
                    hopId = RecipeHops.insert(hop);

                    removeMethod(hopId);

                    RecipeHops.find({}).count().should.equal(0);
                });

                it("Should be able to update hop", function() {
                    let newName = recipeHop().name;

                    hopId = RecipeHops.insert(hop);

                    updateMethod(hopId, {name: newName});

                    RecipeHops.findOne(hopId).name.should.equal(newName);
                });
            });
        });

    });
}