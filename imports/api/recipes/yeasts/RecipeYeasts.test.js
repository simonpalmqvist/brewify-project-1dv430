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
import { RecipeYeasts } from "./RecipeYeasts";

import "./methods";

const should = chai.should();
const { stub } = sinon;

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["recipes.yeasts.insert"];
    const updateMethod = Meteor.server.method_handlers["recipes.yeasts.update"];
    const removeMethod = Meteor.server.method_handlers["recipes.yeasts.remove"];

    let userId;
    let recipeId;
    let yeastId;
    let name;
    let form;
    let type;
    let attenuation;
    let minTemperature;
    let maxTemperature;
    let minAlcoholTolerance;
    let maxAlcoholTolerance;

    let recipe;
    let yeast;

    describe("Recipe Yeasts", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            userId = Random.id();
            recipeId = Random.id();
            name = faker.random.words();
            form = faker.random.number({min: 1, max: 2});
            type = faker.random.number({min: 1, max: 5});
            attenuation = faker.random.number({min: 0, max: 100, precision: 0.01});
            minTemperature = faker.random.number({min: 0, max: 100, precision: 0.1});
            maxTemperature = faker.random.number({min: 0, max: 100, precision: 0.1});
            minAlcoholTolerance = faker.random.number({min: 0, max: 20, precision: 0.1});
            maxAlcoholTolerance = faker.random.number({min: 0, max: 20, precision: 0.1});

            yeast = {userId, recipeId, name, form, type, attenuation, minTemperature,
                maxTemperature, minAlcoholTolerance, maxAlcoholTolerance};
        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add yeast to recipe", function() {
                yeastId = RecipeYeasts.insert(yeast);

                // Recipe should be added
                RecipeYeasts.find(yeastId).count().should.equal(1);
            });

            it("Should not be able to add yeast without name", function() {
                delete yeast.name;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

            it("Should not be able to add yeast without form", function() {
                delete yeast.form;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

            it("Should not be able to add yeast without type", function() {
                delete yeast.type;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

            it("Should not be able to add yeast without attenuation", function() {
                delete yeast.attenuation;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

            it("Should not be able to add yeast without min temperature", function() {
                delete yeast.minTemperature;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

            it("Should not be able to add yeast without max temperature", function() {
                delete yeast.maxTemperature;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

            it("Should not be able to add yeast without min alcohol tolerance", function() {
                delete yeast.minAlcoholTolerance;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

            it("Should not be able to add yeast without max alcohol tolerance", function() {
                delete yeast.maxAlcoholTolerance;

                (() => RecipeYeasts.insert(yeast)).should.throw(Error);

                //Recipe should not be added
                RecipeYeasts.find({}).count().should.equal(0);
            });

        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new yeast", function() {

                    (() => insertMethod(recipeId, yeast)).should.throw(Error);

                    RecipeYeasts.find({}).count().should.equal(0);
                });

                it("Should not be able to remove hop", function() {
                    yeastId = RecipeYeasts.insert(yeast);

                    (() => removeMethod(yeastId)).should.throw(Error);

                    RecipeYeasts.find({}).count().should.equal(1);
                });

                it("Should not be able to update hop", function() {
                    yeastId = RecipeYeasts.insert(yeast);

                    (() => updateMethod(yeastId, {name: faker.lorem.words()})).should.throw(Error);

                    RecipeYeasts.findOne(yeastId).name.should.equal(name);
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


                it("Should be able to insert new yeast", function() {

                    insertMethod(recipeId, yeast);

                    RecipeYeasts.find({}).count().should.equal(1);
                });

                it("Should not be able to insert more than one yeast", function() {

                    insertMethod(recipeId, yeast);

                    (() => insertMethod(recipeId, yeast)).should.throw(Error);

                    RecipeYeasts.find({}).count().should.equal(1);
                });

                it("Should be able to remove yeast", function() {
                    yeastId = RecipeYeasts.insert(yeast);

                    removeMethod(yeastId);

                    RecipeYeasts.find({}).count().should.equal(0);
                });

                it("Should be able to update yeast", function() {
                    let newName = faker.lorem.words();

                    yeastId = RecipeYeasts.insert(yeast);

                    updateMethod(yeastId, {name: newName});

                    RecipeYeasts.findOne(yeastId).name.should.equal(newName);
                });
            });

        });
    });
}