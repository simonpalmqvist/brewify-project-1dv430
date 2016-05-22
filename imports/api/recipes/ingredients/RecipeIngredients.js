/**
 * @description Other ingredients collection for recipes
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Ground } from "meteor/ground:db";

export const RecipeIngredients = new Mongo.Collection("recipes.ingredients");

//Add schema
RecipeIngredients.schema = new SimpleSchema({
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
    amount: {
        type: Number,
        min: 0,
        decimal: true
    },
    added: {
        type: Number,
        min: 1,
        max: 6
    },
    time: {
        type: Number,
        min: 0
    },
    timeType: {
        type: Number,
        min: 1,
        max: 2
    }
});

//Use schema on writes
RecipeIngredients.attachSchema(RecipeIngredients.schema);

//Create ground collection to be able to store and access data offline for client
if (Meteor.isClient) {
    Ground.Collection(RecipeIngredients);
}