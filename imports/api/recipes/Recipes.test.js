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
import { stub } from "sinon";

import { Recipes } from "./Recipes";

import "./methods";

const should = chai.should();

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["recipes.insert"];
    const updateMethod = Meteor.server.method_handlers["recipes.update"];
    const removeMethod = Meteor.server.method_handlers["recipes.remove"];

    let userId;
    let recipeId;
    let name;
    let batchSize;
    let boilTime;

    describe("Recipes", () => {
        beforeEach(() => {
            //Reset database
            resetDatabase();

            //Set fake information
            name = faker.lorem.words();
            batchSize = faker.random.number({min: 10, max: 1000});
            boilTime = faker.random.number({min: 30, max: 1000});
        });

        after(() => {
            resetDatabase();
        });

        describe("collection", () => {

            it("Should be able to add recipe", () => {
                Recipes.insert({userId, name, batchSize, boilTime});

                // Recipe should be added
                Recipes.find({name}).count().should.equal(1);
            });

            it("Should not be able to add recipe without name", () => {

                (() => Recipes.insert({userId, boilTime, batchSize})).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without boil time", () => {

                (() => Recipes.insert({userId, name, batchSize})).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without batch size", () => {

                (() => Recipes.insert({userId, name, boilTime})).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });
        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new recipe", () => {
                    (() => insertMethod(name, boilTime, batchSize)).should.throw(Error);

                    Recipes.find({}).count().should.equal(0);
                });

                it("Should not be able to remove recipe", () => {
                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

                    (() => removeMethod(recipeId)).should.throw(Error);

                    Recipes.find({}).count().should.equal(1);
                });

                it("Should not be able to update recipe", () => {
                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

                    (() => updateMethod(recipeId, {name: faker.lorem.words()})).should.throw(Error);

                    Recipes.findOne(recipeId).name.should.equal(name);
                });
            });

            describe("Authenticated", () => {
                before(() => {
                    userId = Random.id();
                    stub(Meteor, "userId", () => userId);
                });

                after(() => {
                    Meteor.userId.restore();
                });


                it("Should be able to insert new recipe", () => {

                    insertMethod(name, boilTime, batchSize);

                    Recipes.find({}).count().should.equal(1);
                });

                it("Should be able to remove recipe", () => {
                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

                    removeMethod(recipeId);

                    Recipes.find({}).count().should.equal(0);
                });

                it("Should be able to update recipe", () => {
                    let newName = faker.lorem.words();

                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

                    updateMethod(recipeId, {name: newName});

                    Recipes.findOne(recipeId).name.should.equal(newName);
                });
            });

        });

    });
}