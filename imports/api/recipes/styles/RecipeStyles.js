/**
 * @description Styles collection for recipes
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const RecipeStyles = new Mongo.Collection("recipes.styles");

//Add schema
RecipeStyles.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    recipeId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    styleId: {
        type: Number,
        min: 1
    }
});

//Use schema on writes
RecipeStyles.attachSchema(RecipeStyles.schema);