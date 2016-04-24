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

import { BrewProfiles } from "./BrewProfiles";
import "./methods";

const should = chai.should();
const { stub } = sinon;

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["brew.profiles.insert"];
    const updateMethod = Meteor.server.method_handlers["brew.profiles.update"];
    const removeMethod = Meteor.server.method_handlers["brew.profiles.remove"];

    let userId;
    let brewProfileId;
    let efficiency;
    let hopUtilization;
    let batchSize;
    let boilTime;
    let evapRate;
    let waterGrainRatio;
    let boilLoss;
    let lauterDeadSpace;
    let grainTemp;

    let brewProfile;

    describe("Brew Profiles", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            //Set fake information
            userId = Random.id();
            brewProfileId = Random.id();
            efficiency = faker.random.number({min: 0, max: 100});
            hopUtilization = faker.random.number({min: 0, max: 100});
            batchSize = faker.random.number({min: 0, max: 1000});
            boilTime = faker.random.number({min: 0, max: 120});
            evapRate = faker.random.number({min: 0, max: 100});
            waterGrainRatio = faker.random.number({min: 0, max: 10});
            boilLoss = faker.random.number({min: 0, max: 10});
            lauterDeadSpace = faker.random.number({min: 0, max: 10});
            grainTemp = faker.random.number({min: 0, max: 100});

            brewProfile = {
                userId,
                efficiency,
                hopUtilization,
                batchSize,
                boilTime,
                evapRate,
                waterGrainRatio,
                boilLoss,
                lauterDeadSpace,
                grainTemp
            };
        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add a brew profile", function() {
                BrewProfiles.insert(brewProfile);

                // Brew profile should be added
                BrewProfiles.find({userId}).count().should.equal(1);
            });

            it("Should not be able to add brewprofile without efficiency", function() {
                delete brewProfile.efficiency;

                console.log(brewProfile);

                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
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