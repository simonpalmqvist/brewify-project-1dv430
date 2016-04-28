/**
 * @description Yeasts collection for recipes
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const RecipeYeasts = new Mongo.Collection("recipes.yeasts");

//Add schema
RecipeYeasts.schema = new SimpleSchema({
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
        type: Number, //Type can be 1 LIQUID, 2 DRY
        min: 1,
        max: 2
    },
    type: {
        type: Number, //Type can be 1 ALE, 2 LAGER, 3 WHEAT, 4 CHAMPAGNE, 5 WINE
        min: 1,
        max: 5
    },
    attenuation: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    minTemperature: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    maxTemperature: {
        type: Number,
        min: 0,
        max: 100,
        decimal: true
    },
    minAlcoholTolerance: {
        type: Number,
        min: 0,
        max: 20,
        decimal: true
    },
    maxAlcoholTolerance: {
        type: Number,
        min: 0,
        max: 20,
        decimal: true
    }
});

/*
    Name:
    yeastType: lager/ale/wine/wheat/champagne
    yeastForm: liquid/dry

    attenuation: 75

    minTemperature: default 18
    maxTemperature: default 23

    minAlcoholTolerance: default 5
    maxAlcoholTolerance: default 18

//Use for something
    productId: WLP009
    supplier: White Labs

 */

//Use schema on writes
RecipeYeasts.attachSchema(RecipeYeasts.schema);
