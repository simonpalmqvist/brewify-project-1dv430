/**
 * @description Hops collection for recipes
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const RecipeHops = new Mongo.Collection("recipes.hops");

//Add schema
RecipeHops.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    recipeId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    name: {
        type: String,
        max: 100
    },
    form: {
        type: Number, //Type can be 0 LEAF, 1 PELLET, 2 EXTRACT
        min: 0,
        max: 2
    },
    use: {
        type: Number, //Type can be 0 BOIL, 1 DRY_HOP
        min: 0,
        max: 1
    },
    alpha: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    amount: {
        type: Number,
        min: 0,
        decimal: true
    },
    time: {
        type: Number,
        min: 0,
        max: 300
    }
});

//Use schema on writes
RecipeHops.attachSchema(RecipeHops.schema);
