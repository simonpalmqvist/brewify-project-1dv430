/* eslint-env mocha */
/**
 * @description Unit tests for collection and collections methods
 * @author simonpalmqvist
 */


import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import chai from "meteor/practicalmeteor:chai";
import { Random } from "meteor/random";
import faker from "faker";
import { sinon } from "meteor/practicalmeteor:sinon";

import { Recipes } from "../Recipes";
import { RecipeFermentables } from "./RecipeFermentables";

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
    let name;
    let amount;
    let potential;
    let ebc;

    let recipe;

    describe("Recipe Fermentables", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            userId = Random.id();
            recipeId = Random.id();
            name = faker.lorem.words();
            amount = faker.random.number({min: 0, max: 10});
            potential = faker.random.number({min: 1.000, max: 1.060, precision: 0.001});
            ebc = faker.random.number({min: 1, max: 140});
        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add fermentables to recipe", function() {
                RecipeFermentables.insert({userId, recipeId, name, amount, potential, ebc});

                // Recipe should be added
                RecipeFermentables.find({name}).count().should.equal(1);
            });

            it("Should not be able to add fermentables without name", function() {

                (() => RecipeFermentables.insert({userId, recipeId, amount, potential, ebc})).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });

            it("Should not be able to add fermentables without amount", function() {

                (() => RecipeFermentables.insert({userId, recipeId, name, potential, ebc})).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });

            it("Should not be able to add fermentables without potential", function() {

                (() => RecipeFermentables.insert({userId, recipeId, name, amount, ebc})).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });

            it("Should not be able to add fermentables without EBC", function() {

                (() => RecipeFermentables.insert({userId, recipeId, name, amount, extracYield})).should.throw(Error);

                //Recipe should not be added
                RecipeFermentables.find({}).count().should.equal(0);
            });
        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new fermentable", function() {
                    (() => insertMethod(recipeId, name, potential, ebc)).should.throw(Error);

                    RecipeFermentables.find({}).count().should.equal(0);
                });

                it("Should not be able to remove fermentable", function() {
                    fermentableId = RecipeFermentables.insert({userId, recipeId, name, amount, potential, ebc});

                    (() => removeMethod(fermentableId)).should.throw(Error);

                    RecipeFermentables.find({}).count().should.equal(1);
                });

                it("Should not be able to update recipe", function() {
                    fermentableId = RecipeFermentables.insert({userId, recipeId, name, amount, potential, ebc});

                    (() => updateMethod(fermentableId, {name: faker.lorem.words()})).should.throw(Error);

                    RecipeFermentables.findOne(fermentableId).name.should.equal(name);
                });
            });

            describe("Authenticated", function() {
                before(function() {
                    stub(Meteor, "userId", () => userId);
                });

                beforeEach(function() {
                    recipeId = Recipes.insert({
                        userId,
                        name: faker.lorem.words(),
                        batchSize: faker.random.number({min: 10, max: 1000}),
                        boilTime: faker.random.number({min: 30, max: 1000})
                    });
                });

                after(function() {
                    Meteor.userId.restore();
                });


                it("Should be able to insert new fermentable", function() {

                    insertMethod(recipeId, name, potential, ebc);

                    RecipeFermentables.find({}).count().should.equal(1);
                });

                it("Should be able to remove fermentable", function() {
                    fermentableId = RecipeFermentables.insert({userId, recipeId, name, amount, potential, ebc});

                    removeMethod(fermentableId);

                    RecipeFermentables.find({}).count().should.equal(0);
                });

                it("Should be able to update fermentable", function() {
                    let newName = faker.lorem.words();

                    fermentableId = RecipeFermentables.insert({userId, recipeId, name, amount, potential, ebc});

                    updateMethod(fermentableId, {name: newName});

                    RecipeFermentables.findOne(fermentableId).name.should.equal(newName);
                });
            });

        });

    });
}