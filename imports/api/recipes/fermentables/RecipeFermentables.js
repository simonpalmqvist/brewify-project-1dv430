/**
 * @description Fermentables collection for recipes
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Ground } from "meteor/ground:db";

export const RecipeFermentables = new Mongo.Collection("recipes.fermentables");

//Add schema
RecipeFermentables.schema = new SimpleSchema({
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
    potential: {
        type: Number,
        min: 1,
        max: 2,
        decimal: true
    },
    ebc: {
        type: Number,
        min: 0,
        max: 2000,
        decimal: true
    }
});

//Use schema on writes
RecipeFermentables.attachSchema(RecipeFermentables.schema);

//Create ground collection to be able to store and access data offline for client
if (Meteor.isClient) {
    Ground.Collection(RecipeFermentables);
}