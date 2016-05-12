/**
 * @description Recipes collection to store users collections
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Recipes = new Mongo.Collection("recipes");

//Add schema
Recipes.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    name: {
        type: String,
        max: 100
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
    efficiency: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    boilLoss: {
        type: Number,
        min: 0,
        decimal: true
    },
    fermenterLoss: {
        type: Number,
        min: 0,
        decimal: true
    }
});

//Use schema on writes
Recipes.attachSchema(Recipes.schema);
