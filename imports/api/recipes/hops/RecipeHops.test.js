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
    let name;
    let form;
    let use;
    let alpha;
    let amount;
    let time;

    let recipe;
    let hop;

    describe("Recipe Hops", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            userId = Random.id();
            recipeId = Random.id();
            name = faker.random.words();
            form = faker.random.number({min: 1, max: 3});
            use = faker.random.number({min: 1, max: 2});
            alpha = faker.random.number({min: 0, max: 100, precision: 0.01});
            amount = faker.random.number({min: 0, max: 1000});
            time = faker.random.number({min: 0, max: 300});

            hop = {userId, recipeId, name, form, use, alpha, amount, time};
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
                    (() => insertMethod(recipeId, use, name, alpha, form)).should.throw(Error);

                    RecipeHops.find({}).count().should.equal(0);
                });

                it("Should not be able to remove hop", function() {
                    hopId = RecipeHops.insert(hop);

                    (() => removeMethod(hopId)).should.throw(Error);

                    RecipeHops.find({}).count().should.equal(1);
                });

                it("Should not be able to update hop", function() {
                    hopId = RecipeHops.insert(hop);

                    (() => updateMethod(hopId, {name: faker.lorem.words()})).should.throw(Error);

                    RecipeHops.findOne(hopId).name.should.equal(name);
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


                it("Should be able to insert new hop", function() {

                    insertMethod(recipeId, use, name, alpha, form);

                    RecipeHops.find({}).count().should.equal(1);
                });

                it("Should be able to remove hop", function() {
                    hopId = RecipeHops.insert(hop);

                    removeMethod(hopId);

                    RecipeHops.find({}).count().should.equal(0);
                });

                it("Should be able to update hop", function() {
                    let newName = faker.lorem.words();

                    hopId = RecipeHops.insert(hop);

                    updateMethod(hopId, {name: newName});

                    RecipeHops.findOne(hopId).name.should.equal(newName);
                });
            });
        });

    });
}