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

import { Recipes } from "./Recipes";

import "./methods";

const should = chai.should();
const { stub } = sinon;

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["recipes.insert"];
    const updateMethod = Meteor.server.method_handlers["recipes.update"];
    const removeMethod = Meteor.server.method_handlers["recipes.remove"];

    let userId;
    let recipeId;
    let recipe;
    let name;
    let batchSize;
    let boilTime;
    let efficiency;
    let boilLoss;
    let fermenterLoss;

    describe("Recipes", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            userId = Random.id();
            name = faker.lorem.words();
            batchSize = faker.random.number({min: 10, max: 1000});
            boilTime = faker.random.number({min: 30, max: 1000});
            efficiency = faker.random.number({min: 0, max: 100});
            boilLoss = faker.random.number({min: 0, max: 10});
            fermenterLoss = faker.random.number({min: 0, max: 10});

            recipe = {
                userId,
                name,
                batchSize,
                boilTime,
                efficiency,
                boilLoss,
                fermenterLoss
            };
        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add recipe", function() {
                Recipes.insert(recipe);

                // Recipe should be added
                Recipes.find({name}).count().should.equal(1);
            });

            it("Should not be able to add recipe without name", function() {
                delete recipe.name;
                (() => Recipes.insert(recipe)).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without boil time", function() {
                delete recipe.boilTime;
                (() => Recipes.insert(recipe)).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without batch size", function() {
                delete recipe.batchSize;
                (() => Recipes.insert(recipe)).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without efficiency", function() {
                delete recipe.efficiency;
                (() => Recipes.insert(recipe)).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without boil loss", function() {
                delete recipe.boilLoss;
                (() => Recipes.insert(recipe)).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without fermenter loss", function() {
                delete recipe.fermenterLoss;
                (() => Recipes.insert(recipe)).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });
        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new recipe", function() {
                    (() => insertMethod(recipe)).should.throw(Error);

                    Recipes.find({}).count().should.equal(0);
                });

                it("Should not be able to remove recipe", function() {
                    recipeId = Recipes.insert(recipe);

                    (() => removeMethod(recipeId)).should.throw(Error);

                    Recipes.find({}).count().should.equal(1);
                });

                it("Should not be able to update recipe", function() {
                    recipeId = Recipes.insert(recipe);

                    (() => updateMethod(recipeId, {name: faker.lorem.words()})).should.throw(Error);

                    Recipes.findOne(recipeId).name.should.equal(name);
                });
            });

            describe("Authenticated", function() {
                before(function() {
                    stub(Meteor, "userId", () => userId);
                });

                after(function() {
                    Meteor.userId.restore();
                });


                it("Should be able to insert new recipe", function() {

                    insertMethod(recipe);

                    Recipes.find({}).count().should.equal(1);
                });

                it("Should be able to remove recipe", function() {
                    recipeId = Recipes.insert(recipe);

                    removeMethod(recipeId);

                    Recipes.find({}).count().should.equal(0);
                });

                it("Should be able to update recipe", function() {
                    let newName = faker.lorem.words();

                    recipeId = Recipes.insert(recipe);

                    updateMethod(recipeId, {name: newName});

                    Recipes.findOne(recipeId).name.should.equal(newName);
                });
            });

        });

    });
}