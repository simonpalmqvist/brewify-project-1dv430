/**
 * @description Brew Profile collection do store users brewing settings
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const BrewProfiles = new Mongo.Collection("brew.profiles");

//Add schema
BrewProfiles.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    efficiency: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    hopUtilization: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    batchSize: {
        type: Number,
        min: 0,
        decimal: true
    },
    boilTime: {
        type: Number,
        min: 0
    },
    evapRate: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    waterGrainRatio: {
        type: Number,
        min: 0,
        max: 10,
        decimal: true
    },
    boilLoss: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    lauterDeadSpace: {
        type: Number,
        min: 0,
        decimal: true
    },
    grainTemp: {
        type: Number,
        min: 0
    }
});

//Use schema on writes
BrewProfiles.attachSchema(BrewProfiles.schema);
