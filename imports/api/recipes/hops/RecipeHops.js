/**
 * @description Hops collection for recipes
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Ground } from "meteor/ground:db";

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
        type: Number, //Type can be 1 LEAF, 2 PELLET, 3 EXTRACT
        min: 1,
        max: 3
    },
    use: {
        type: Number, //Type can be 1 BOIL, 2 DRY_HOP
        min: 1,
        max: 2
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

//Create ground collection to be able to store and access data offline for client
if (Meteor.isClient) {
    Ground.Collection(RecipeHops);
}