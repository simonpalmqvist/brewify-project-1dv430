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
    let name;
    let batchSize;
    let boilTime;

    describe("Recipes", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            userId = Random.id();
            name = faker.lorem.words();
            batchSize = faker.random.number({min: 10, max: 1000});
            boilTime = faker.random.number({min: 30, max: 1000});
        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add recipe", function() {
                Recipes.insert({userId, name, batchSize, boilTime});

                // Recipe should be added
                Recipes.find({name}).count().should.equal(1);
            });

            it("Should not be able to add recipe without name", function() {

                (() => Recipes.insert({userId, boilTime, batchSize})).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without boil time", function() {

                (() => Recipes.insert({userId, name, batchSize})).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });

            it("Should not be able to add recipe without batch size", function() {

                (() => Recipes.insert({userId, name, boilTime})).should.throw(Error);

                //Recipe should not be added
                Recipes.find({}).count().should.equal(0);
            });
        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new recipe", function() {
                    (() => insertMethod(name, boilTime, batchSize)).should.throw(Error);

                    Recipes.find({}).count().should.equal(0);
                });

                it("Should not be able to remove recipe", function() {
                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

                    (() => removeMethod(recipeId)).should.throw(Error);

                    Recipes.find({}).count().should.equal(1);
                });

                it("Should not be able to update recipe", function() {
                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

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

                    insertMethod(name, boilTime, batchSize);

                    Recipes.find({}).count().should.equal(1);
                });

                it("Should be able to remove recipe", function() {
                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

                    removeMethod(recipeId);

                    Recipes.find({}).count().should.equal(0);
                });

                it("Should be able to update recipe", function() {
                    let newName = faker.lorem.words();

                    recipeId = Recipes.insert({userId, name, batchSize, boilTime});

                    updateMethod(recipeId, {name: newName});

                    Recipes.findOne(recipeId).name.should.equal(newName);
                });
            });

        });

    });
}