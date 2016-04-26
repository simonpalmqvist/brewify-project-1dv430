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

//import "./methods";

const should = chai.should();
const { stub } = sinon;

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["recipes.hops.insert"];
    const updateMethod = Meteor.server.method_handlers["recipes.hops.update"];
    const removeMethod = Meteor.server.method_handlers["recipes.hops.remove"];

    let userId;
    let recipeId;
    let hopsId;
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
            form = faker.random.number({min: 0, max: 2});
            use = faker.random.number({min: 0, max: 1});
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
                hopsId = RecipeHops.insert(hop);

                // Recipe should be added
                RecipeHops.find({_id: hopsId}).count().should.equal(1);
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
/*
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
        */

    });
}