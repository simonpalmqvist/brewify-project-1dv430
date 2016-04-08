/**
 * @description Recipes collection to store users collections
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Recipes = new Mongo.Collection("Recipes");

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
        min: 5,
        decimal: true
    },
    boilTime: {
        type: Number,
        min: 30
    }
});

//Use schema on writes
Recipes.attachSchema(Recipes.schema);
