/**
 * @description Recipes collection to store users collections
 * @author simonpalmqvist
 */

import { Mongo } from "meteor/mongo";
import simpleSchema from "meteor/aldeed:collection2";

export const Recipes = new Mongo.Collection("Recipes");

Recipes.schema = new SimpleSchema({
    owner: {
        type: String,
        autoValue: function() { return this.userId; }
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