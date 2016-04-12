/**
 * @description Fermentables collection for recipes
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

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
    extractYield: {
        type: Number,
        min: 0,
        max: 100
    },
    ebc: {
        type: Number,
        min: 0,
        max: 140
    }
});

//Use schema on writes
RecipeFermentables.attachSchema(RecipeFermentables.schema);
