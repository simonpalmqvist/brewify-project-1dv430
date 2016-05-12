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
    let batchSize;
    let boilTime;
    let evapRate;
    let waterGrainRatio;
    let boilLoss;
    let fermenterLoss;
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
            batchSize = faker.random.number({min: 0, max: 1000});
            boilTime = faker.random.number({min: 0, max: 120});
            evapRate = faker.random.number({min: 0, max: 100});
            waterGrainRatio = faker.random.number({min: 0, max: 10});
            boilLoss = faker.random.number({min: 0, max: 10});
            fermenterLoss = faker.random.number({min: 0, max: 10});
            lauterDeadSpace = faker.random.number({min: 0, max: 10});
            grainTemp = faker.random.number({min: 0, max: 100});

            brewProfile = {
                userId,
                efficiency,
                batchSize,
                boilTime,
                evapRate,
                waterGrainRatio,
                boilLoss,
                fermenterLoss,
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

            it("Should not be able to add brew profile without efficiency", function() {
                delete brewProfile.efficiency;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not be able to add brew profile without batchSize", function() {
                delete brewProfile.batchSize;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not be able to add brew profile without boilTime", function() {
                delete brewProfile.boilTime;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not be able to add brew profile without evapRate", function() {
                delete brewProfile.evapRate;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not be able to add brew profile without waterGrainRatio", function() {
                delete brewProfile.waterGrainRatio;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not be able to add brew profile without boilLoss", function() {
                delete brewProfile.boilLoss;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not be able to add brew profile without lauterDeadSpace", function() {
                delete brewProfile.lauterDeadSpace;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not be able to add brew profile without grainTemp", function() {
                delete brewProfile.grainTemp;
                (() => BrewProfiles.insert(brewProfile)).should.throw(Error);

                //BrewProfile should not be added
                BrewProfiles.find({}).count().should.equal(0);
            });

            it("Should not contain properties not defined by schema", function() {
                brewProfile.dummy = "dummy";
                BrewProfiles.insert(brewProfile);

                //BrewProfile should be added
                BrewProfiles.find({}).count().should.equal(1);

                //Brew profile should not contain dummy property
                should.not.exist(BrewProfiles.findOne({}).dummy);
            });
        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new brew profile", function() {
                    (() => insertMethod(brewProfile)).should.throw(Error);

                    BrewProfiles.find({}).count().should.equal(0);
                });

                it("Should not be able to remove brew profile", function() {
                    //Adding user to be able to insert brew profile to perform test
                    brewProfile.userId = userId;
                    brewProfileId = BrewProfiles.insert(brewProfile);

                    (() => removeMethod(brewProfileId)).should.throw(Error);

                    BrewProfiles.find({}).count().should.equal(1);
                });

                it("Should not be able to update brew profile", function() {
                    const newBatchSize = faker.random.number({min: 0, max: 1000});

                    //Adding user to be able to insert brew profile to perform test
                    brewProfile.userId = userId;
                    brewProfileId = BrewProfiles.insert(brewProfile);

                    (() => updateMethod(brewProfileId, {batchSize: newBatchSize})).should.throw(Error);

                    BrewProfiles.findOne(brewProfileId).batchSize.should.equal(batchSize);
                });
            });

            describe("Authenticated", function() {
                before(function() {
                    stub(Meteor, "userId", () => userId);
                });

                after(function() {
                    Meteor.userId.restore();
                });


                it("Should be able to insert new brew profile", function() {

                    insertMethod(brewProfile);

                    BrewProfiles.find({}).count().should.equal(1);
                });

                it("Should be able to remove brew profile", function() {
                    //Adding user to be able to insert brew profile to perform test
                    brewProfile.userId = userId;
                    brewProfileId = BrewProfiles.insert(brewProfile);

                    removeMethod(brewProfileId);

                    BrewProfiles.find({}).count().should.equal(0);
                });

                it("Should be able to update brew profile", function() {
                    const newBatchSize = faker.random.number({min: 0, max: 1000});

                    //Adding user to be able to insert brew profile to perform test
                    brewProfile.userId = userId;
                    brewProfileId = BrewProfiles.insert(brewProfile);

                    updateMethod(brewProfileId, {batchSize: newBatchSize});

                    BrewProfiles.findOne(brewProfileId).batchSize.should.equal(newBatchSize);
                });
            });
        });
    });
}